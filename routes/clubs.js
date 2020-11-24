const express = require('express');
const clubController = require('../controllers/clubController')

const router = express.Router();

router.get('/clubs', clubController.getClubs)

module.exports = router;