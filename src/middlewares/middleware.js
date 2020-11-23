const { ContatoModel } = require('../model/ContatoModel');

exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err){
        console.log(err);
       return res.render('404');
    }
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};


exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login para realizar essa ação.');
        req.session.save(() => res.redirect('/login'));
        return;
    }
    next();
}

exports.databaseCheckup = async (req, res, next) => {
    try {
        if(!req.session.user) {
            req.flash('errors', 'Você precisa estar logado para ver a lista de contatos.');
            req.session.save(() => res.redirect('/login'));
            return;
        }
            await ContatoModel.find({}).sort({criadoEm: -1}).then((contacts) => {
                res.locals.contacts = contacts;
                next();
            });
    }catch(e) {
        res.render('404');
        console.log(e);
    }
}