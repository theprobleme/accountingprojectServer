const express = require('express');
const { response } = require('express');
const authController = require('../controllers/homeController')

const router = express.Router();

router.get('/', authController.getCookie)

module.exports = router;