const express = require('express');
const { response } = require('express');
const analytictable = require('../controllers/analytictableController')

const router = express.Router();

router.get('/analytictable', analytictable.getAnalytic)
router.post('/analytictable', analytictable.createAnalytic)
router.delete('/analytictable', analytictable.deleteAnalytic)

module.exports = router;