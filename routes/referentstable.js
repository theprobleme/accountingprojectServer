const express = require('express');
const referentstableController = require('../controllers/referentstableController')

const router = express.Router();

router.get('/referentstable', referentstableController.getReferents)
router.post('/referentstable', referentstableController.modifiedReferent)

module.exports = router;