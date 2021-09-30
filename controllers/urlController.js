const urls = require('../models/urls');

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