const { users, urlDatabase } = require('../models/database.js');

function generateRandomString() {
  return (Math.random() * 1e+18).toString(36).slice(0, 6);
};

function findUserByEmail(email) {
  for (let key in users) {
    if (users[key]['email'] === email) {
      return key;
    }
  }
};

exports.index = (req, res) => {
  let userId = req.cookies["userId"];
  let user = users[userId];
  const templateVars = { 
    urls: urlDatabase,
    user: user,
    error: ""
  };
  res.render("pages/urls_index", templateVars);
};

exports.display_user_login = (req, res) => {
  let userId = req.cookies["userId"];
  let user = users[userId];
  const templateVars = { 
    user: user,
    error: "",
  };
  res.render("pages/urls_login", templateVars);
};

exports.display_user_register = (req, res) => {
  let userId = req.cookies["userId"];
  let user = users[userId];
  const templateVars = { 
    user: user,
    error: "",
  };
  res.render("pages/urls_register", templateVars);
};

exports.display_urls_new = (req, res) => {
  let userId = req.cookies["userId"];

  if (!userId) {
    const templateVars = {};
    templateVars.error = "";
    templateVars.user = null;
    templateVars.urls = urlDatabase;

    templateVars.error = "Log in to create new URLs";
    return res.render("pages/urls_index", templateVars);
  }
  let user = users[userId];
  const templateVars = { 
    user: user
  };
  res.render("pages/urls_new", templateVars);
};

exports.display_urls_show = (req, res) => {
  const templateVars = { 
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL],
    user: req.cookies["userId"] 
  };
  res.render("pages/urls_show", templateVars);
};

exports.user_logout = (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
};

exports.user_login = (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  let user = findUserByEmail(email);

  const templateVars = {};
  templateVars.error = "";
  templateVars.user = null;

  if (!user) {
    templateVars.error = "User does not exist!";
    return res.render("pages/urls_login", templateVars);
  }

  if (users[user]['password'] !== password) {
    templateVars.error = "Password incorrect";
    return res.render("pages/urls_login", templateVars);
  }

  res.cookie('userId', user);

  res.redirect('/');
};

exports.user_register = (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  let user = findUserByEmail(email);

  const templateVars = {};
  templateVars.error = "";
  templateVars.user = null;

  if (!email || !password) {
    templateVars.error = "Email or password cannot be blank.";
    return res.render("pages/urls_register", templateVars);
  }

  if (user) {
    templateVars.error = "Email already in use.";
    return res.render("pages/urls_register", templateVars);
  }

  userId = generateRandomString();

  users[userId] = { 
    'id': userId,
    'email': email,
    'password': password
  };

  res.cookie('userId', userId);
  res.redirect('/');
};