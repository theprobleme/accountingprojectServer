module.exports = function (app) {
    app.listen(process.env.SERVER_PORT, console.log("SERVER Connected on port " + process.env.SERVER_PORT))
}