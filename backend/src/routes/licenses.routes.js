const express = require('express');
const router = express.Router();
const licensesController = require('../repositories/licenses.repository'); 


router.get('/', (req, res, next) => licensesController.getAll(req, res, next));
router.post('/', (req, res, next) => licensesController.create(req, res, next));


router.get('/valid', (req, res, next) => licensesController.getValid(req, res, next));
router.get('/top-developers', (req, res, next) => licensesController.getTopThree(req, res, next));

module.exports = router;