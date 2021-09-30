const { response } = require("express");
const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const mongoose = require("mongoose");
const mongoDB = 'mongodb+srv://dbUser:arrayfunctionnew@cluster0.x8tjj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const newRouter = require('./routes/new');
const registerRouter = require('./routes/register');
const showRouter = require('./routes/show');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/new', newRouter);
app.use('/register', registerRouter);
app.use('/show', showRouter);


module.exports = app;