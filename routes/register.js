const express = require('express');
const router = express.Router();
const database_controller = require('../controllers/databaseController');

//Get page for creating new account
router.get('/', database_controller.display_user_register);

//Create new account
router.post('/', database_controller.user_register);

module.exports = router;