const Contato = require('../model/ContatoModel');

exports.index = (req, res) => {
    res.render('contato');
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => {
                return res.redirect('/contato');
            });
            return;
        };
        req.flash('success', 'Seu contato foi cadastrado com sucesso.');
        req.session.save(() => {
            return res.redirect('/');
        });

    } catch(e) {
        res.render('404');
        console.log(e);
    }
}