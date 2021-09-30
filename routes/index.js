const express = require('express');
const router = express.Router();
const database_controller = require('../controllers/databaseController');

//GET home page
router.get('/', database_controller.index);
router.get('/urls/:shortURL', database_controller.display_urls_show);
router.get('/u/:shortURL', database_controller.display_urls_show);

router.post('/urls/:shortURL/delete', database_controller.url_delete);
router.post('/urls/:id', database_controller.url_edit);

module.exports = router;