exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: 'Titulo',
        senha: 'Porra'
    })
}

exports.trataPost = (req, res) => {
    res.send(req.body);
    return;
}