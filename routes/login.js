const express = require('express');
const router = express.Router();
const { users, urlDatabase } = require('../public/javascripts/database');

router.get("/", (req, res, next) => {
  let userId = req.cookies["userId"];
  let user = users[userId];
  const templateVars = { 
    user: user,
    error: "",
  };
  res.render("pages/urls_login", templateVars);
});

module.exports = router;