const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/request.controller');
router.get('/', requestsController.getAll);


module.exports = router;