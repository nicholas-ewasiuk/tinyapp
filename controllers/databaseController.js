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

//Display home page
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

//Display login page
exports.display_user_login = (req, res) => {
  let userId = req.cookies["userId"];
  let user = users[userId];
  const templateVars = { 
    user: user,
    error: "",
  };
  res.render("pages/urls_login", templateVars);
};

//Display registration page
exports.display_user_register = (req, res) => {
  let userId = req.cookies["userId"];
  let user = users[userId];
  const templateVars = { 
    user: user,
    error: "",
  };
  res.render("pages/urls_register", templateVars);
};

//Display URL creation page
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

//Display individual URL page with editing
exports.display_urls_show = (req, res) => {
  const templateVars = { 
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL],
    user: req.cookies["userId"] 
  };
  res.render("pages/urls_show", templateVars);
};

//Navigate to long URL
exports.display_urls_long = (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
}; 


//Delete URL from database
exports.url_delete = (req, res) => {
  let shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];

  res.redirect('/');
};

//Create new shortened URL
exports.url_new = (req, res) => {
  let longURL = req.body.longURL;

  shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;

  res.redirect(`/urls/${shortURL}`);
};

//Edit long URL
exports.url_edit = (req, res) => {
  let longURL = req.body.longURL;
  let shortURL = req.params.id;

  urlDatabase[shortURL] = longURL;

  res.redirect('/');
};

//Logout current user
exports.user_logout = (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
};

//Submit login info
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

//Submit info for creating new account
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