const express = require('express');
const { response } = require('express');
const driveController = require('../controllers/driveController');

const router = express.Router();

router.get('/drive', driveController.getDrive)
router.put('/drive', driveController.createDrive)
router.delete('/drive', driveController.deleteDrive)

module.exports = router;