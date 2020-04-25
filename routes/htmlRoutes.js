// Include Path library
var path = require("path");

// Handle HTML routes 
module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/index.html"));
    });

    // app.get("*", function (req, res) {
    //     res.sendFile(path.join(__dirname, "/../public/index.html"));
    // });

    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/notes.html"));
    });
};