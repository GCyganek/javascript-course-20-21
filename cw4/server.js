var http = require("http");
var fs = require('fs');

http.createServer(function (request, response) {
	/*
	  ,,request'' - input stream - contains data received from the browser, e.g. encoded contents of HTML form fields

	  ,,response'' - output stream - put in it data that you want to send back to the browser.
		 The answer sent by this stream must consist of two parts: the header and the body.
		 The header contains, among others, information about the type (MIME) of data contained in the body.
		 The body contains the correct data, e.g. a form definition.

	*/
	console.log("--------------------------------------");
	console.log("The relative URL of the current request: " + request.url + "\n");
	var url = new URL(request.url, `http://${request.headers.host}`); //Create the URL object
	if (url.pathname == '/submit') { //Processing the form content, if the relative URL is '/submit'
		var stringToCheck = url.searchParams.get('string'); //Read the contents of the field (form) named 'name'
        console.log("Creating a response header");
		response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });  //Creating an answer header - we inform the browser that the body of the answer will be plain text
		console.log("Creating a response body");
        fs.readdir('./', (err, data) => {
            if (err) throw err;
            const dirContent = data;
            if (dirContent.includes(stringToCheck)) {
                fs.lstat(`./${stringToCheck}`, (err, stat) => {
                    if (err) throw err;
                    if (stat.isDirectory()) {
                        response.write('Given string is a directory name');
                        response.end(); //The end of the response - send it to the browser
                        console.log("Sending the response");
                    } else if (stat.isFile()) {
                        fs.readFile(`./${stringToCheck}`, 'utf-8', (err, data) => {
                            if (err) throw err;
                            response.write(`Given string is a file and here is its content:\n${data}`);
                            response.end(); //The end of the response - send it to the browser
                            console.log("Sending the response");
                        });
                    }
                });
            } else {
                response.write('No such file or directory in this directory.');
                response.end(); //The end of the response - send it to the browser
                console.log("Sending the response");
            }
        });
	}
	else { //Generating the form
		console.log("Creating a response header")
		response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });  //Creating a repsonse header - we inform the browser that the body of the response will be HTML text
		//and now we put an HTML form in the body of the answer
		console.log("Creating a response body");
		response.write(`<form method="GET" action="/submit">
	    					<label for="string">Give the string you want to check</label>
	    					<input name="string">
	    					<br>
	    					<input type="submit">
	    					<input type="reset">
	    				</form>`);
		response.end();  //The end of the response - send it to the browser
		console.log("Sending the response");
	}
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");