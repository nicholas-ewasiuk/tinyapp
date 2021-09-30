const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/', user_controller.user_register);

module.exports = router;