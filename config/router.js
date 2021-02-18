// A CLEAN 

const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const express = require('express')

const whitelist = ['http://localhost:8080']
const corsOption = {
    credentials: true,
    preflightContinue: true,
    origin: setCorsOrigins
}
const publicDirectory = path.join(__dirname, './public')

module.exports = function (app) {

    app.options('*', cors(corsOption))

    app.use(function (request, response, next) {
        if (request.method === 'OPTIONS') {
            response.status(204).end(0)
        } else {
            next()
        }
    })

    app.use(cors(corsOption))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cookieParser())

    app.use(function (req, res, next) {						//Setting up headers in order to improve security OWASP ZAP 
        // Avoir en détail set Header
        res.setHeader('X-Content-Type-Options', 'nosniff');	//Setting content-type-options to nosniff
        res.setHeader('X-XSS-Protection', '1; mode=block');	//Setting XSS protection
        res.setHeader('X-Frame-Options', 'DENY');			//Preventing cross domain iframe injection (no iframe is allowed)
        res.setHeader('Pragma', 'no-cache');					//Setting pragme header to no cache
        res.setHeader('Cache-Control', 'private, 	' +		//Setting cache control to be private
            'no-cache, 	' +		//--------------------------- no cache
            'no-store, 	' +		//--------------------------- no store
            'must-revalidate');	//--------------------------- must revalidate

        next();												//Stepping to next middleware after the HTTP headers have been set

    });


    app.use(express.json())

    app.use(express.static(publicDirectory))


    app.use('/api/user', require('../routes/login'))

    app.use('/api/*', require('../routes/apiroot'))

    // Route d'API /api/user pour le login
    
    app.use('/api/user', require('../routes/contacts'))

    app.use('/api/user', require('../routes/profil'))

    app.use('/api/user', require('../routes/clubs'))

    app.use('/api/home', require('../routes/home'))

    app.use('/api/user', require('../routes/form'))

    app.use('/api/user', require('../routes/drive'))

    app.use('/api/user', require('../routes/courses'))

    app.use('/api/user', require('../routes/accountchart'))

    app.use('/api/user', require('../routes/clubstable'))

    app.use('/api/user', require('../routes/userstable'))

    app.use('/api/user', require('../routes/inputtable'))

    app.use('/api/user', require('../routes/referentstable'))

    app.use('/api/user', require('../routes/analytictable'))
}


/**
         * Checks if the origin is allowed to emit a request to the server
         * @param {string} origin the query originator
         * @param {callback} the callback called on function end/result
         */
function setCorsOrigins(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {		//Checking if the origin is part of the whitelist
        callback(null, true)					//Nexting on Origin check success
    } else {									//In case of error
        let err = new Error('Forbidden');   	//Creating new error
        err.status = 403;                 		//Setting error status
        err.hint = "Origin is not allowed";   	//Setting error hint
        callback(err);							//Nexting error to end of middleware stack
    }
}

