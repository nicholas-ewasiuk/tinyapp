const { response } = require("express");
const express = require("express");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const app = express();
const PORT = 8080;


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString() {
  return (Math.random() * 1e+18).toString(36).slice(0, 6);
};

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.get("/urls", (req, res) => {
  const templateVars = { 
    urls: urlDatabase,
    username: req.cookies["username"] 
  };
  res.render("pages/urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = { 
    username: req.cookies["username"] 
  };
  res.render("pages/urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { 
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL],
    username: req.cookies["username"] 
  };
  res.render("pages/urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const templateVars = { 
    username: req.cookies["username"] 
  };
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL, templateVars);
}); 

app.post("/urls", (req, res) => {
  let longURL = req.body.longURL;

  shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;

  res.redirect(`/urls/${shortURL}`);
});

app.post("/login", (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/urls');
});

app.post("/logout/", (req, res) => {
  res.clearCookie('username');
  res.redirect('/urls');
});

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

/*
app.get("/", (req, res) => {
  let mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012 },
    { name: 'Tux', organization: "Linux", birth_year: 2013 },
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013 }
  ];
  let tagline = "No programming concept is complete without a cute animal mascot.";
  
  res.render('pages/index', {
    mascots: mascots,i
    tagline: tagline
  });
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

/*
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
*/

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
