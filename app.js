const express = require('express');
const app = express();
const path = require('path');

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/home'));

module.exports = app;