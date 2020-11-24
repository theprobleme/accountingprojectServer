const express = require('express');
const { response } = require('express');
const accountchartController = require('../controllers/accountchartController')

const router = express.Router();

router.get('/accountchart', accountchartController.getAccountchart)
router.post('/accountchart', accountchartController.createAccountchart)
router.delete('/accountchart', accountchartController.deleteAccountchart)

module.exports = router;