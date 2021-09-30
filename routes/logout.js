const express = require('express');
const router = express.Router();
const database_controller = require('../controllers/databaseController');

router.post("/", database_controller.user_logout);

module.exports = router;