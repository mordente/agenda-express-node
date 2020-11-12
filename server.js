require('dotenv').config();
const ejs = require('ejs');
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true});
const routes = require('./routes')

app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("Acessar http://localhost:3000")
    console.log("Estou online");
});