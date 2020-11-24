const express = require('express');
const contactsController = require('../controllers/contactsController')

const router = express.Router();

router.get('/contact', contactsController.getContacts)

module.exports = router;