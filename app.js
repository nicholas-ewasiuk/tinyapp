const { response } = require("express");
const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const newRouter = require('./routes/new');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/new', newRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);

module.exports = app;