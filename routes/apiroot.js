const express = require('express');
const apiController = require('../controllers/apiController')

const router = express.Router();

router.all('/', apiController.verifyToken)

module.exports = router;