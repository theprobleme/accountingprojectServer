const jwt = require('jsonwebtoken')

exports.verifyToken = async (request, response, next) => {
    jwt.verify(request.cookies['jwt'], process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            response.status(403)
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