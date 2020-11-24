const { request, response } = require('express')
const myqsl = require('mysql')

const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Dans .env, on met les variables à sécuriser et on l'appel ici
});

exports.getReferents = async (request, response) => {
    var isadmin = request.isadmin
    if (isadmin) {
        db.query("SELECT DISTINCT u.iduser, u.firstname, u.lastname, c.clubname, c.shortname, c.idclub FROM users u LEFT JOIN referentof r ON u.iduser = r.iduser LEFT JOIN clubs c ON r.shortname = c.shortname ORDER BY u.lastname", async (error, results) => {
            const array = Object.values(JSON.parse(JSON.stringify(results)))
            response.send(array)
        })
    }
}

exports.getReferentList = async (request, response) => {
    var isadmin = request.isadmin
    if (isadmin) {
        db.query("SELECT u.iduser, u.firstname, u.lastname FROM users u", async (error, results) => {
            const array = Object.values(JSON.parse(JSON.stringify(results)))
            console.log(array)
            response.send(array)
        })  
    }
}

exports.getShortnameList = async (request, response) => {
    var isadmin = request.isadmin
    if (isadmin) {
        db.query("SELECT c.clubname, c.shortname, c.idclub FROM clubs c", async (error, results) => {
            const array = Object.values(JSON.parse(JSON.stringify(results)))
            console.log(array)
            response.send(array)
        })     
    }
}