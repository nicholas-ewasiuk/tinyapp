const { response } = require("express");
const express = require("express");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const app = require("./app");

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

const PORT = 8080;

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  'userOne': {
    id: 'userOne',
    email: 'a@a.com',
    password: '123'
  }
};

app.post("/urls", (req, res) => {
  let longURL = req.body.longURL;

  shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;

  res.redirect(`/urls/${shortURL}`);
});

/*
app.post("/register", (req, res) => {

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
});
*/
/*
app.post("/login", (req, res) => {

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

  res.redirect('/urls');
});
*/
/*
app.post("/logout/", (req, res) => {
  res.clearCookie('userId');
  res.redirect('/urls');
});
*/

// delete_route
app.post("/urls/:shortURL/delete", (req, res) => {
  let shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];

  res.redirect('/urls');
});

app.post("/urls/:id", (req, res) => {
  let longURL = req.body.longURL;
  let shortURL = req.params.id;

  urlDatabase[shortURL] = longURL;

  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


