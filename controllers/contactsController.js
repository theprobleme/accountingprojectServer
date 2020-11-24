const { request, response } = require('express')
const myqsl = require('mysql')

const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Dans .env, on met les variables à sécuriser et on l'appel ici
});

exports.getContacts = async (request, response) => {
    db.query('SELECT c.clubname, c.img, u.lastname, u.firstname , u.email, u.phone FROM referentof r INNER JOIN clubs c JOIN users u WHERE r.shortname = c.shortname AND r.iduser = u.iduser ORDER BY c.clubname ASC', async (error, results) => {
        const array = Object.values(JSON.parse(JSON.stringify(results)))
        response.send(array)
    })
}