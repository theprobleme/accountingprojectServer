const express = require('express');
const profilController = require('../controllers/profilController')

const router = express.Router();

router.get('/profil', profilController.getProfil)

module.exports = router;