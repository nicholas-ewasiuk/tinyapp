const { users, urlDatabase } = require('../models/database.js');

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
  res.redirect('/urls');
};