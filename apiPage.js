
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
app.use(express.static('public'));



app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//This is the basic code of the game. 

app.get('/', function(req,res,next){

	res.render('startPage');

});

app.get('/laxAPI', function(req,res,next){

	res.render('laxapi');

});

app.get('/taleoftwoAPIs', function(req,res,next){

	res.render('TaleOfTwoAPI');

});

app.get('/2ndImplementaton', function(req,res,next){

	res.render('2ndImplementation');

});

app.get('/customAPI', function(req,res,next){

	res.render('customAPI');

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

