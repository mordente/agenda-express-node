const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

//ROTAS DA HOME
route.get('/', homeController.index);

//ROTAS DO LOGIN
route.get('/login', loginController.index);
route.post('/login/cadastro', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//ROTAS DE CONTATO
route.get('/contato', contatoController.index);
route.post('/contato/register', contatoController.index);
module.exports = route;