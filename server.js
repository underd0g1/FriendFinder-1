// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var path = require('path');
var fs = require('fs');



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

// declare the body parser stuff as easy to remember variable  names
  var fullname = req.body.yourName;

  var q1 = req.body.question1;
  var q2 = req.body.question2;
  var q3 = req.body.question3;
  var q4 = req.body.question4;
  var q5 = req.body.question5;
  var q6 = req.body.question6;
  var q7 = req.body.question7;
  var q8 = req.body.question8;
  var q9 = req.body.question9;
  var q10 = req.body.question10;

  // construct our json object  structure
 var formObject = {
   name: fullname,
  questions: [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10]
};

console.log(formObject);

// we are going to use this section on another route to show the world our json response.

var textdb = fs.readFileSync('db.json', 'utf8');
console.log('read thefile');
console.log(textdb);
// var db = require(__dirname + '/db.json');

//send the db.txt file to the api page (route) to show file contents to the world.
var freshjson = JSON.parse(textdb);

console.log('parsed the file into json' + typeof freshjson)

 freshjson.push(formObject);
console.log('pushed to the new array');
console.log(freshjson);
//using the fs module to save the object we made above into a txt file which will act as a makeshift database.

var restring = JSON.stringify(freshjson);
//
fs.writeFile('db.json', restring, function(err){
  if(err) throw err;
   console.log('restring was saved to db.json.');
 });
 console.log('appended array to json file');


 //we are now going to use the data that we got and compare it to each other (the main point of this app)

 // function compare(recently_submitted_data, rest_of_our_json){
 //   for(var i = 0; i < formObject.questions.length; i++){
 //
 //   }
 // }



});

//adding our api route to display the raw list of friends
app.get('/api', function(request, response){

  console.log('api route was hit');

  var textdb = fs.readFileSync('db.json', 'utf8');

  var freshjson = JSON.parse(textdb);
  response.send(freshjson);

});


//require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
