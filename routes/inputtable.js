const express = require('express');
const inputtableController = require('../controllers/inputtableController')

const router = express.Router();

router.get('/inputtable', inputtableController.getAccountingEntry)

module.exports = router;