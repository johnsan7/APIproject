
//This code, var express through app.set('port',1776) is code from Professor Justin Wolford the OSU Web Development professor. The implementation that I have is the exact same as the lectures


var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');


var request = require('request');




app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());




app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 1776);



	
app.get('/', function(req,res)
{
	console.log("Please send requests as POSTS");	

});
//This should take the post request, then send a get request to HaveIBeenPwned, if the email was not in the Ashley Madison hack, it should add the email with a false as key, if it was, it should add the email with a true key
app.post('/', function(req,res)
{
	
	var outObj = {};
	var hackedList = [];
	//The below is the url to add the email addresses to
	var baseUrl = 'https://haveibeenpwned.com/api/breachedaccount/'
		

		//For each email address fed
		for(var email in req.body)
		{
			var specificUser = req.body[email];
			console.log("Specific user is: ", specificUser);
			//The below sends the request to HIBP in a get using v1 of the API
				request(baseUrl + specificUser, function(err,response,body)
				{
					var borkedEmail = specificUser;
					console.log("making request to HIBP");
					if(!err && (response.statusCode > 199 && response.statusCode < 400))
					{
						hackedList.push(body);
						console.log(hackedList);

					}
					else if(response.statusCode == 403)
					{

					}
			
				});
			

		}

		
	res.render('returned');
});


//These next two functions were written by Justin Wolford, USO CS Professor
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
	console.log('Started on port 1776');
	
});
