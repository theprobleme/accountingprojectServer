const myqsl = require('mysql');

const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Dans .env, on met les variables à sécuriser et on l'appel ici
});

exports.createCourses = async (request, response) => {
    const isadmin = request.isadmin
    const link = request.body.link
    if (isadmin) {
        db.query("UPDATE links SET link = ? WHERE id = '2'", [link], (error, results) => {
            response.send({
                message: 'Cours créé !',
                type: 'primary',
            })
        })
    } else {
        response.send("Vous n'êtes pas administrateur")
    }
}


exports.getCourses = async (request, response) => {
    db.query('SELECT * FROM links WHERE id = "2"', async (error, results) => {
        const array = Object.values(JSON.parse(JSON.stringify(results)))
        response.send(array)
    })
}

exports.deleteCourses = async (request, response) => {
    db.query('UPDATE links SET link=NULL WHERE id ="2"', async (error, results) => {
        response.send({
            message: 'Cours supprimé !',
            type: 'error',
        })
    })
}