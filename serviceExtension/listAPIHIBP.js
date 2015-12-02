
//This code, var express through app.set('port',3000) is code from lectures and the class. The implementation that I have is the exact same as the lectures
//This program is a game where there are 100 random zip codes from US locations. You have to guess the temperature within 5 degrees without knowing the name
//of the city. You get 3 points for a correct answer and lose 1 point for an incorrect. 

var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var session = require('express-session');

var request = require('request');




app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());




app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

	console.log("Program started");

	
app.get('/', function(req,res)
{
	console.log("Please send requests as POSTS");	

});
//This should take the post request, then send a get request to HaveIBeenPwned, if the email was not in the Ashley Madison hack, it should add the email with a false as key, if it was, it should add the email with a true key
app.post('/', function(req,res)
{
	//console.log("getting to post");
	var outObj = {};
	var hackedList = [];
	var baseUrl = 'https://haveibeenpwned.com/api/breachedaccount/'
		//console.log("Got just before if");

		console.log("Request length over 0, working");
		for(var email in req.body)
		{
			var specificUser = req.body[email];
			console.log("Specific user is: ", specificUser);
				request(baseUrl + specificUser, function(err,response,body)
				{
					var borkedEmail = specificUser;
					console.log("making request to HIBP");
					if(!err && (response.statusCode > 199 && response.statusCode < 400))
					{
						hackedList.push(body);
						console.log(hackedList);

						//var response = JSON.parse(body);
					}
					else if(response.statusCode == 403)
					{
						//console.log("403 status returned");
						//var emptyList = ["None"];
						//hackedList.push(emptyList);
					}
			
				});
			

		}
		console.log("request done, got to end");
		
	outObj.badSites = hackedList;
	res.JSON(outObj);
});


//These next two are right from the lectures
app.use(function(req,res)
{
	res.status(404);
	res.render('404');
	
});

app.use(function(err,req,res,next){
	res.type('plain/text');
	res.status(500);
	res.render('500');	
});


app.listen(app.get('port'), function(){
	console.log('Started on port 3000');
	
});
