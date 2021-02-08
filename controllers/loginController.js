// Chargement des modules
const { request, response } = require('express')    // Express
const myqsl = require('mysql')                      // Module pour MySQL
const jwt = require('jsonwebtoken')                 // Module pour le token
const bcrypt = require('bcryptjs')                  // Module pour l'encryptage

// Connexion à la base de données
const db = myqsl.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database: process.env.DATABASE    // Récupération des variables d'environnement
});

// Fonction login
exports.login = async (request, response) => {

        // Déclaration des variables
        const email = request.body.email
        const password = request.body.password

        // Requêtes SQL
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (await bcrypt.compare(password, results[0].password)) {                             // Vérification du mot de passe
                
                // Déclaration des variables pour le token
                const id = results[0].iduser                                                          
                const isadmin = results[0].position == "ADMIN"
                
                // Signature du token
                const token = jwt.sign({ id: id, isadmin: isadmin }, process.env.JWT_SECRET, {     
                    expiresIn: process.env.JWT_EXPIRE_IN,
                })

                // Paramétrage du cookie
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    Path: "/",
                    maxAge: 1000 * 60 * 360,
                    httpOnly: true,
                    secure: false
                }

                response.cookie('jwt', token, cookieOptions)        // Génération du cookie
                response.status(200)                                // Status de la réponse
                response.send(results[0])                           // résultat
                console.log(results[0])

            } else {
                response.status(401)
                response.send({                                     
                    message: 'Identifiant ou mot de passe incorrect',
                })
            }
        })
}

exports.verifyToken = async (request, response, next) => {
    jwt.verify(request.cookies['jwt'], process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            response.status(403)
            response.send({
                message: 'Identifiant ou mot de passe incorrect',
                status: 403
            })
        } else {
            db.query('SELECT * FROM users WHERE iduser = ?', [decodedToken.id], async (error, results) => {
                response.send(results[0])
            })
        }
    })
}
/*
exports.register = (request, response) => {
    console.log(request.body);
    // On récupère les infos à partir de name = "XXX" du fichier register.ejs dans le body
     Méthode 1
    const name = request.body.name
    const email = request.body.email
    const password = request.body.password
    const passwordConfirm = request.body.passwordConfirm


    // Méthode 2
    const {name , email, password, passwordConfirm} = request.body

    db.query('SELECT email FROM users WHERE email =?', [email], async(error, results) => {
        if(error) {
            console.log(error);
        }
        if (results.length > 0) {
            return response.render('register', {
                message: "That email is already registered"
            })
        } else if(password !== passwordConfirm) {
            return response.render('register', {
                message: "Passwords do not match"
            })
        }

        // Hash le mot de passe avec niveau 10
        let hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        // Insertion des données dans la db
        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log(results)
                return response.render('register', {
                    message: "User registered"
                })
            }
        })
    })

}
*/