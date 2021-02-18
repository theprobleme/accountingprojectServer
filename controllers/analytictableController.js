const { response, request } = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE
})

exports.getAnalytic = async (request, response) => {
    db.query('SELECT * FROM analytic ORDER BY num', async (error, results) => {
        var array = Object.values(JSON.parse(JSON.stringify(results)))
        response.send(array)
        console.log(array)
    })
}

exports.createAnalytic = async (request, response) => {
    const numAnalytic = request.body.numAnalytic
    const nameAnalytic = request.body.nameAnalytic
    db.query('INSERT INTO analytic SET ?', { num: numAnalytic, name: nameAnalytic }, (error, results) => {
        if (error) {
            console.log(error)
            if (error.errno = 1064) {
                response.send({
                    message: 'Ce numéro de compte existe déjà parmi les analytiques',
                    type: 'error',
                })
            } else {
                response.send({
                    message: 'Une erreur est survenue',
                    type: 'error',
                })
            }
        } else {
            response.send({
                message: "Numéro d'analytique ajouté !",
                type: 'primary',
            })
        }
    })
}

exports.deleteAnalytic = async (request, response) => {
    const numAnalyticDelete = request.body.numAnalyticDelete
    const nameAnalyticDelete = request.body.nameAnalyticDelete
    const isadmin = request.isadmin
    if (isadmin) {
        db.query("DELETE from analytic WHERE num = ? AND name= ?", [numAnalyticDelete, nameAnalyticDelete], (error, results) => {
            if (error) {
                response.send({
                    message: "Une erreur est survenue",
                    type: "error",
                })
            } else {
                response.send({
                    message: "Numéro et nom de l'analytique supprimé !",
                    type: "error",
                })
            }
        })
    }
}