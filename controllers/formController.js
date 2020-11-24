const { request, response } = require('express')
const myqsl = require('mysql');
const { copy } = require('../routes/form');

const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Dans .env, on met les variables à sécuriser et on l'appel ici
});

exports.createForm = async(request, response) => {
    var isadmin = request.isadmin
    var link = request.body.link
    console.log(isadmin)
    if (isadmin) {
        db.query("UPDATE links SET link = ? WHERE id = '0'",  [link],  (error, results) => {
            response.send({
                message: 'Sondage ajouté !',
                type: 'primary',
            })
        })
    } else {
        response.send("Vous n'êtes pas administrateur")
    }
}


exports.getForm = async (request, response) => {
    db.query('SELECT * FROM links WHERE id = "0"', async (error, results) => {
        var array = Object.values(JSON.parse(JSON.stringify(results)))
        response.send(array)
    })
}

exports.deleteForm = async(request, response) => {
    db.query('UPDATE links SET link=NULL WHERE id ="0"', async (error, results) => {
        response.send({
            message: 'Sondage supprimé !',
            type: 'error',
        })
    })
}


