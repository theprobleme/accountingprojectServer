const { request, response } = require('express')
const myqsl = require('mysql')
const {v4 : uuidv4} = require("uuid")

const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Dans .env, on met les variables à sécuriser et on l'appel ici
});

exports.getUsers = async (request, response) => {
    var isadmin = request.isadmin
    if (isadmin) {
        db.query("SELECT DISTINCT u.lastname, u.firstname, u.email, u.position, u.phone, c.clubname, u.iduser, u.password FROM users u LEFT JOIN referentof r ON u.iduser = r.iduser LEFT JOIN clubs c ON r.shortname = c.shortname ORDER BY u.lastname", async (error, results) => {
            // AND u.position NOT IN('ADMIN')  - Permet d'exclure l'admin 
            const array = Object.values(JSON.parse(JSON.stringify(results)))
            response.send(array)
        })
    }

}

exports.createUser = async (request, response) => {
    var isadmin = request.isadmin
    var firstname = request.body.firstname
    var lastname = request.body.lastname
    var email = request.body.email
    var password = request.body.password
    var phone = request.body.phone
    var position = request.body.position
    try {
        var iduser = await uniqueID()
    } catch (error) {
        console.log(error)
    }
    if(isadmin) {
        db.query('INSERT INTO users SET ?', {iduser : iduser, firstname: firstname, lastname: lastname, email: email, password: password, phone: phone, position: position}, (error, results) => {
            if (error) {
                // num error 1366 : ER_TRUNCATED_WRONG_VALUE_FOR_FIELD
                console.log(error)
            } else {
                response.send({
                    message: 'Utilisateur ajouté !',
                    type: 'primary',
                })
            }
        })
    }
}

exports.deleteUser = async (request, response) => {
    var iduser = request.body.iduser
    var firstname = request.body.firstname
    var lastname = request.body.lastname
    var email = request.body.email
    console.log(iduser)
    console.log(firstname)
    db.query('DELETE FROM users WHERE iduser = ? AND firstname = ? AND lastname = ? AND email = ?', [iduser, firstname, lastname, email], async (error, results) => {
        if (error) {
            console.log(error)
        } else {
            response.send({
                message: 'Utilisateur supprimé !',
                type: 'primary',
            })
        }
    })
}

exports.modifiedUser = async (request, response) => {
    var isadmin = request.isadmin
    var iduser = request.body.iduser
    var firstname = request.body.firstname
    var lastname = request.body.lastname
    var email = request.body.email
    var password = request.body.password
    var phone = request.body.phone
    var position = request.body.position
    if (isadmin) {
        db.query('UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, phone = ?, position = ? WHERE iduser = ?', [firstname, lastname, email, password, phone, position, iduser], (error, results) => {
            if(error) {
                console.log(error)
            } else {
                response.send({
                    message: 'Utilisateur modifié !',
                    type: 'primary',
                })
            }
        })
    }
}

async function uniqueID() {
    return new Promise((resolve, reject) => {
        db.query('SELECT iduser FROM users', (error, results) => {
            if(error) {
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
