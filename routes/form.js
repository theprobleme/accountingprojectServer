const express = require('express');
const { response } = require('express');
const formController = require('../controllers/formController');

const router = express.Router();

router.get('/form', formController.getForm)
router.put('/form', formController.createForm)
router.delete('/form', formController.deleteForm)

module.exports = router;