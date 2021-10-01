const { users, urlDatabase } = require('../models/database.js');
const bcrypt = require('bcryptjs');
const { generateRandomString, findUserByEmail } = require('./helper.js');

exports.home = (req, res) => {
  if (req.session.userId) {
    return res.redirect('/urls');
  }
  res.redirect('/login');
};

//Display home page
exports.index = (req, res) => {
  let userId = req.session.userId;
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
  let userId = req.session.userId;
  let user = users[userId];
  const templateVars = { 
    user: user,
    error: "",
  };
  res.render("pages/urls_login", templateVars);
};

//Display registration page
exports.display_user_register = (req, res) => {
  /*if (req.session.userId) {
    res.redirect('/');
  }*/

  let userId = req.session.userId;
  let user = users[userId];
  const templateVars = { 
    user: user,
    error: "",
  };
  res.render("pages/urls_register", templateVars);
};

//Display URL creation page
exports.display_urls_new = (req, res) => {
  let userId = req.session.userId;

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

  if (req.session.userId) {
    const templateVars = { 
      shortURL: req.params.shortURL, 
      longURL: urlDatabase[req.params.shortURL]['longURL'],
      user: users[req.session.userId]
    }
    return res.render("pages/urls_show", templateVars);
  }
  res.redirect('/');
};

//Navigate to long URL
exports.display_urls_long = (req, res) => {
  if (urlDatabase[req.params.shortURL]) {
    const longURL = urlDatabase[req.params.shortURL]['longURL'];
    return res.redirect(longURL);
  }
  return res.status(400).send("URL not found");
}; 


//Delete URL from database
exports.url_delete = (req, res) => {
  let shortURL = req.params.shortURL;
  let userId = req.session.userId;

  if (urlDatabase[shortURL]['userId'] === users[userId]['id']) {
    delete urlDatabase[shortURL];
  }
  console.log(urlDatabase);
  res.redirect('/');
};

//Create new shortened URL
exports.url_new = (req, res) => {
  let longURL = req.body.longURL;
  shortURL = generateRandomString();

  urlDatabase[shortURL] = { 
    'longURL': longURL,
    'userId': req.session.userId
  };
  console.log(urlDatabase);
  res.redirect(`/urls/${shortURL}`);
};

//Edit long URL
exports.url_edit = (req, res) => {
  let longURL = req.body.longURL;
  let shortURL = req.params.id;

  urlDatabase[shortURL]['longURL'] = longURL;

  res.redirect('/');
};

//Logout current user
exports.user_logout = (req, res) => {
  req.session = null;
  res.redirect('/');
};

//Submit login info
exports.user_login = (req, res) => {

  let email = req.body.email;

  let user = findUserByEmail(email, users);

  const templateVars = {};
  templateVars.error = "";
  templateVars.user = null;

  if (!user) {
    templateVars.error = "User does not exist!";
    return res.render("pages/urls_login", templateVars);
  }

  let hashedPassword = users[user]['password'];
  let passMatch = bcrypt.compareSync(req.body.password, hashedPassword);

  if (!passMatch) {
    templateVars.error = "Password incorrect";
    return res.render("pages/urls_login", templateVars);
  }

  if (passMatch) {
    req.session.userId = user;
  }

  res.redirect('/');
};

//Submit info for creating new account
exports.user_register = (req, res) => {

  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 10);

  let user = findUserByEmail(email, users);

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

  let userId = generateRandomString();

  users[userId] = { 
    'id': userId,
    'email': email,
    'password': password
  };

  req.session.userId = users[userId]['id'];
  console.log(users);
  res.redirect('/');
};