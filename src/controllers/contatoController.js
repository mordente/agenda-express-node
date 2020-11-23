const {Contato} = require('../model/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
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
        console.log(contato.contato);
        req.session.save(() => {
            return res.redirect('/');
        });

    } catch(e) {
        res.render('404');
        console.log(e);
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato) return res.render('404');

    res.render('contato', {contato})
}

exports.edit = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        const contato = await new Contato(req.body);
        contato.edit(req.params.id);
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect(`../${req.params.id}`));
            return;
        };
        req.flash('success', 'Seu contato foi editado.');
        req.session.save(() => res.redirect('back'));
        return;
    }catch(e) {
        res.render('404');
    }
}

exports.delete = (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        Contato.delete(req.params.id);
        
        req.flash('success', 'Seu contato foi excluido.');
        req.session.save(() => res.redirect('/'));
        return;

    }catch(e) {
        console.log(e);
    }
}