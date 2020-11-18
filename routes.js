const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

//ROTAS DA HOME
route.get('/', homeController.index);

//ROTAS DO LOGIN
route.get('/login', loginController.index)
route.post('/login/cadastro', loginController.register)

module.exports = route;