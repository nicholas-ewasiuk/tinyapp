const express = require('express');
const router = express.Router();
const database_controller = require('../controllers/databaseController');

router.get('/', database_controller.home);
router.get('/u/:shortURL', database_controller.display_urls_long);

module.exports = router;