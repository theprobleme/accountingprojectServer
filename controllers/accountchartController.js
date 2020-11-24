const { response, request } = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE
})

exports.getAccountchart = async(request, response) => {
    db.query('SELECT * FROM accountchart', async(error, results) => {
        var array = Object.values(JSON.parse(JSON.stringify(results)))
        response.send(array)
    })
}

exports.createAccountchart = async(request, response) => {
    const numAccount = request.body.numAccount
    const nameAccount = request.body.nameAccount
    db.query('INSERT INTO accountchart SET ?', { num: numAccount, name: nameAccount }, (error, results) => {
        if (error) {
            if (error.errno = 1064) {
                response.send({
                    message: 'Ce numéro de compte existe déjà dans le plan comptable',
                    type : 'error',
                })
            } else {
                response.send({
                    message: 'Une erreur est survenue',
                    type: 'error',
                })
            }
             
        } else {
            response.send({
                message : "Numéro de compte ajouté !",
                type: 'primary',
            })
        }
    })
}

exports.deleteAccountchart = async(request, response) => {
    const numAccountDelete = request.body.numAccountDelete
    const nameAccountDelete = request.body.nameAccountDelete
    const isadmin = request.isadmin
    if (isadmin) {
        db.query("DELETE from accountchart WHERE num = ? AND name= ?", [numAccountDelete, nameAccountDelete], (error, results) => {
            if (error) {
                response.send({
                    message : "Une erreur est survenue",
                    type : "error",
                })
            } else {
                response.send({
                    message : "Numéro et nom de compte supprimé !",
                    type : "error",
                })
            }
        })
    }
    
}
// { num: numAccountDelete, name: nameAccountDelete }
