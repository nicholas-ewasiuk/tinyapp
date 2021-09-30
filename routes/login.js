const express = require('express');
const router = express.Router();
const database_controller = require('../controllers/databaseController');

router.get("/", database_controller.display_user_login);

router.post("/", database_controller.user_login);

module.exports = router;