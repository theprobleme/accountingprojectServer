const myqsl = require('mysql');

const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Dans .env, on met les variables à sécuriser et on l'appel ici
});

exports.createDrive = async (request, response) => {
    var isadmin = request.isadmin
    var link = request.body.link
    console.log(isadmin)
    if (isadmin) {
        db.query("UPDATE links SET link = ? WHERE id = '1'", [link], (error, results) => {
            response.send({
                message: 'Drive ajouté !',
                type: 'primary',
            })
        })
    } else {
        response.send("Vous n'êtes pas administrateur")
    }
}


exports.getDrive = async (request, response) => {
    db.query('SELECT * FROM links WHERE id = "1"', async (error, results) => {
        var array = Object.values(JSON.parse(JSON.stringify(results)))
        response.send(array)
    })
}

exports.deleteDrive = async (request, response) => {
    db.query('UPDATE links SET link=NULL WHERE id ="1"', async (error, results) => {
        response.send({
            message: 'Drive supprimé !',
            type: 'error',
        })
    })
}