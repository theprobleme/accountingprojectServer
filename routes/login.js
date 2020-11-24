// Chargement des modules
const express = require('express');
const { response } = require('express');

// Déclaration de la fonction middleware
const loginController = require('../controllers/loginController')

// Déclaration du système de routage
const router = express.Router();

// Définition de la route
router.post('/login', loginController.login)  // Utilisation de la fonction login
router.get('/token', loginController.verifyToken)
// Export du module router
module.exports = router;