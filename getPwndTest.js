
var req = new XMLHttpRequest();
		
var sendAddress = 'https://haveibeenpwned.com/api/alanmandrag@hotmail.com';
		
req.open('GET', sendAddress, true);
req.setRequestHeader('Accept', 'application/vnd.haveibeenpwned.v2+json', 'User-Agent', 'OSUClassTester');
	
req.addEventListener('load',function()
{
	if(req.status >= 200 && req.status < 400)
	{
		console.log("Request received back!");
		var response = JSON.parse(req.responseText);
		console.log("Response Reads ", response);

	}
	else
	{
		console.log("error, the network request failed " + request.statusText);
	}
			
			
			
	});
	
req.send(null);
		
