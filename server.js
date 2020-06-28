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

//sets bodyparser to handle incoming form data
app.use(bodyparser.urlencoded({
   extended: true
 }));

//Define the routes

//index route: this is the route to handle the main landing page. this defines what will happen when the user first requests your url.
app.get('/', function(request, response){
  // console. confirmation that the request was made to view the index.html page.
  console.log('user wants to see the index page ... so a request was made');
  //sending them the home.html page in response to the user requesting our page.
  response.sendFile(__dirname + '/public/home.html');
});

app.get('/survey', function(request, response){
  //console confirmation to see the user requested our survey page.
  console.log('user wants to see the survey page ... so a request was made on /survey.');
  //sending the  actual survey via survey.html
  response.sendFile(__dirname + '/public/testsurvey.html');
});

app.post('/surveyresponse', function(req,res){
  console.log('user hit the submit button on the survey. we will now send them the json data.');
  console.log("this is what you entered for the title: " + req.body.title);
  console.log("this is what you entered for your name: " + req.body.yourName);
  var name = req.body.yourName;
  var title = req.body.title;

  //constuct the objects
  function Construction(name, q1,q2,q3,q4,q5,q6,q7,q8,q9,q10){
    this.name = name;
    this.questions = function(){
      
    }
    // this.q1 = q1;
    // this.q2 = q2;
    // this.q3 = q3;
    // this.q4 = q4;
    // this.q5 = q5;
    // this.q6 = q6;
    // this.q7 = q7;
    // this.q8 = q8;
    // this.q9 = q9;
    // this.q10 = q10;

  }





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
