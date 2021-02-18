const { response, request } = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE
})

exports.getAnalytic = async (request, response) => {
    db.query('SELECT * FROM analytic', async (error, results) => {
        var array = Object.values(JSON.parse(JSON.stringify(results)))
        response.send(array)
    })
}