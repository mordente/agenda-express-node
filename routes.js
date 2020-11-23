const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired, databaseCheckup } = require('./src/middlewares/middleware');

//ROTAS DA HOME
route.get('/', databaseCheckup, homeController.index);

//ROTAS DO LOGIN
route.get('/login', loginController.index);
route.post('/login/cadastro', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//ROTAS DE CONTATO
route.get('/contato', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

//404 ROTA
route.get('*', homeController.error404);

module.exports = route;