// BoilerPlate Express application 

// Include external libraries
var express = require("express");
var app = express();
var path = require("path");

// Set up PORT, default to 3000 is none defined
var PORT = process.env.PORT || 3000;

// Set up Static content
app.use(express.static(path.join(__dirname, 'public')));

// Set up Middleware  
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Import functions, allow these function to be passed the 'app' object
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes.js")(app);

// Set up Port for listening
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});