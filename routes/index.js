const express = require('express');
const router = express.Router();
const database_controller = require('../controllers/databaseController');

//GET home page
router.get('/', database_controller.index);
router.get('/:shortURL', database_controller.display_urls_show);


router.post('/:shortURL/delete', database_controller.url_delete);
router.post('/:id', database_controller.url_edit);

module.exports = router;