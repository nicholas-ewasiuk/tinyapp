const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString() {
  return (Math.random() * 1e+18).toString(36).slice(0, 6);
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("pages/urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("pages/urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("pages/urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);
  res.send("Ok");
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
