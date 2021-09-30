const express = require('express');
const router = express.Router();
const { users, urlDatabase } = require('../public/javascripts/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  let userId = req.cookies["userId"];
  let user = users[userId];
  const templateVars = { 
    urls: urlDatabase,
    user: user,
    error: ""
  };
  res.render("pages/urls_index", templateVars);
});

module.exports = router;