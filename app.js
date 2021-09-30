const { response } = require("express");
const express = require("express");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");

const app = express();

app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;