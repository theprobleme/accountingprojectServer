const { request, response } = require('express')
const myqsl = require('mysql')

const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Dans .env, on met les variables à sécuriser et on l'appel ici
});

exports.getClubs = async (request, response) => {
    const id = request.userID
    db.query('SELECT c.clubname, c.shortname, c.img, c.idclub, u.lastname, u.firstname , u.email, r.iduser AS ref FROM accessto a INNER JOIN clubs c JOIN referentof r RIGHT JOIN users u ON u.iduser = r.iduser WHERE a.iduser = ? AND a.shortname = c.shortname AND r.shortname = c.shortname GROUP BY c.shortname ORDER BY c.clubname', [id], async (error, results) => {
        const array = Object.values(JSON.parse(JSON.stringify(results)))
        response.send(array)
    })
}