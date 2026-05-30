const express = require('express');
const router = express.Router();
const softwareController = require('../controllers/software.controller');


router.get('/', softwareController.getAll);

module.exports = router;