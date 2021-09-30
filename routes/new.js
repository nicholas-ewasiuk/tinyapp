const express = require('express');
const router = express.Router();
const database_controller = require('../controllers/databaseController');

router.get("/", database_controller.display_urls_new);

router.post("/", database_controller.url_new);

module.exports = router;