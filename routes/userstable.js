const express = require('express');
const userstableController = require('../controllers/userstableController')

const router = express.Router();

router.get('/userstable', userstableController.getUsers)
router.post('/userstable', userstableController.createUser)
router.delete('/userstable', userstableController.deleteUser)
router.put('/userstable', userstableController.modifiedUser)

module.exports = router;