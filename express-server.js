const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8080;


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("pages/urls_index", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("pages/urls_show", templateVars);
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
