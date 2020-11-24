const { request, response } = require('express')
const myqsl = require('mysql')

const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Dans .env, on met les variables à sécuriser et on l'appel ici
});

exports.getProfil = async (request, response) => {
    var id = request.userID
    db.query('SELECT DISTINCT c.clubname, c.img, u.lastname, u.firstname , u.email, u.phone, u.position FROM referentof r INNER JOIN clubs c JOIN users u WHERE u.iduser = ? AND r.shortname = c.shortname AND r.iduser = u.iduser', [id] , async (error, results) => {
        var array = Object.values(JSON.parse(JSON.stringify(results)))
        response.send(array[0])
    })
}