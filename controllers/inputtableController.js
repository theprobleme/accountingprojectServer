const { request, response } = require('express')
const myqsl = require('mysql')

const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Dans .env, on met les variables à sécuriser et on l'appel ici
});

exports.getAccountingEntry = async (request, response) => {
    var shortname = request.query.shortname
    db.query('SELECT * FROM entry WHERE entryjournal = ?', [shortname], async (error, results) => {
        const array = Object.values(JSON.parse(JSON.stringify(results)))
        response.send(array)
    })
}