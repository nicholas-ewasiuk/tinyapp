const express = require('express');
const router = express.Router();
const database_controller = require('../controllers/databaseController');

/* GET home page. */
router.get('/', database_controller.index);

router.get('/urls/:shortURL', database_controller.display_urls_show);

router.get('/u/:shortURL', database_controller.display_urls_show);

module.exports = router;