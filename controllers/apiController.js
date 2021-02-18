const jwt = require('jsonwebtoken')

exports.verifyToken = async (request, response, next) => {
    console.log(request.cookies.jwt)
    jwt.verify(request.cookies['jwt'], process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            response.status(403)
            console.log(error)
            response.send({
                message: 'Identifiant ou mot de passe incorrect',
                status: 403
            })
        } else {
            request.userID = decodedToken.id
            request.isadmin = decodedToken.isadmin
            next()
        } 
    })
}