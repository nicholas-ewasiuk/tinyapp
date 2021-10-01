const express = require('express');
const router = express.Router();
const database_controller = require('../controllers/databaseController');

//Gets the root and redirects to login or home page
router.get('/', database_controller.home);

//Get the web page pointed to by shortened URL
router.get('/u/:shortURL', database_controller.display_urls_long);

module.exports = router;