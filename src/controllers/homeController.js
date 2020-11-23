exports.index = (req, res) => {
    res.render('index')
}

exports.error404 = (req, res) => {
    res.render('404');
}