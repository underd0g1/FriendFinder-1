// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var path = require('path');


var bodyparser = require('body-parser');


// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyparser.urlencoded({
   extended: true 
  }))
// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
app.get('/', function(request, response){
  console.log('user wants to see the index page ... so a request was made');
  response.sendFile(__dirname + '/public/home.html');
});

app.get('/survey', function(request, response){
  console.log('user wants to see the survey page ... so a request was made on /survey.');
  response.sendFile(__dirname + '/public/testsurvey.html');
});

app.post('/surveyresponse', function(req,res){
  console.log('user hit the submit button on the survey. we will now send them the json data.');
  console.log("this is what you entered for the title: " + req.body.title);
  console.log("this is what you entered for your name: " + req.body.yourName);
  var name = req.body.yourName;
  var title = req.body.title;
  



})


require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
