const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Configure le chemin vers .env
dotenv.config( {
    path: './.env'
})

// Lancement base de données
require("./config/db")

// Lancement du serveur
require("./config/server")(app)

// Lancement du router
require("./config/router")(app)
