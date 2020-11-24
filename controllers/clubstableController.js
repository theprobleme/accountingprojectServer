const { request, response } = require('express')
const myqsl = require('mysql')
const { v4: uuidv4 } = require("uuid")

const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Dans .env, on met les variables à sécuriser et on l'appel ici
});

exports.getClubs = async (request, response) => {
    var isadmin = request.isadmin
    if (isadmin) {
        db.query("SELECT DISTINCT u.lastname, u.firstname, u.position, c.clubname, c.shortname, c.img, c.numaccount, c.idclub FROM clubs c LEFT JOIN referentof r ON r.shortname = c.shortname LEFT JOIN users u ON u.iduser = r.iduser ORDER BY c.clubname", async (error, results) => {
            const array = Object.values(JSON.parse(JSON.stringify(results)))
            response.send(array)
        })
    }
}

exports.createClub = async(request, response) => {
    var isadmin = request.isadmin
    var clubname = request.body.clubname
    var shortname = request.body.shortname
    var img = request.body.img
    var numaccount = request.body.numaccount
    try {
        var idclub = await uniqueID()
    } catch (error) {
        console.log(error)
    }
    if(isadmin) {
        db.query('INSERT INTO clubs SET ?', { clubname: clubname, shortname: shortname, img: img, numaccount: numaccount, idclub: idclub}, (error, results) => {
            if (error) {
                // num error 1366 : ER_TRUNCATED_WRONG_VALUE_FOR_FIELD
                console.log(error)
            } else {
                response.send({
                    message: 'Club ajouté !',
                    type: 'primary',
                })
            }
        })
    }
}

exports.deleteClub = async (request, response) => {
    var clubname = request.body.clubname
    var shortname = request.body.shortname
    db.query('DELETE FROM clubs WHERE clubname = ? AND shortname = ?', [clubname, shortname],  async (error, results) => {
        if (error) {
            console.log(error)
        } else {
            response.send({
                message: 'Club supprimé !',
                type: 'primary',
            })
        }
    })
}

exports.modifiedClub = async (request, response) => {
    var isadmin = request.isadmin
    var clubname = request.body.clubname
    var shortname = request.body.shortname
    var img = request.body.img
    var numaccount = request.body.numaccount
    var idclub = request.body.idclub
    if (isadmin) {
        db.query("UPDATE clubs SET clubname = ?, img = ?, numaccount = ?, shortname = ? WHERE idclub = ?", [clubname, img, numaccount, shortname, idclub], (error, results) => {
            if (error) {
                console.log(error)
            } else {
                response.send({
                    message: 'Club modifié !',
                    type: 'primary',
                })
            }
        })
    }
}

async function uniqueID() {
    return new Promise((resolve, reject) => {
        db.query('SELECT iduser FROM users', (error, results) => {
            if (error) {
                reject(error)
            }
            const arrayResults = results.map(item => {
                return item.iduser
            })
            do {
                newID = uuidv4()
            } while (arrayResults.indexOf(newID) != -1);
            resolve(newID)
        })
    });
}