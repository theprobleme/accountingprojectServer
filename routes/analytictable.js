const express = require('express');
const { response } = require('express');
const analytictable = require('../controllers/analytictableController')

const router = express.Router();

router.get('/analytictable', analytictable.getAnalytic)
// router.post('/accountchart', analytictable.createAnalytic)
// router.delete('/accountchart', analytictable.deleteAnalytic)

module.exports = router;