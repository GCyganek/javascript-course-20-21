function onRequest_8080(request, response) {
    console.log("--------------------------------------");
    console.log("The relative URL of the current request on 8080: " + request.url + "\n");
    var url = new URL(request.url, `http://${request.headers.host}`);
    if (request.method === 'GET') {
      switch (url.pathname) {
        case '/':
          fs.stat(file, function (err, stats) {
            if (err == null) {
              fs.readFile(file, function (err, data) {
                response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                response.write(data);
                response.end();
              });
            }
            else {
              response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
              response.write(`The '${file}'file does not exist`);
              response.end();
            }
          });
          break;
        }
    }
  }
  
  function onRequest_8081(request, response) {
    const date = new Date();
    const headers  = { 
        "Content-Type": "text/xml; charset=utf-8",
        "Access-Control-Allow-Origin": 'http://localhost:8080',
    };
    
    if (request.method === 'GET') {
        response.writeHead(200, headers);
        response.write(`
        <div>
            <span id='date'> ${date.toDateString()} </span>
            <span id='time'> ${date.toLocaleTimeString()} </span>
        </div>
        `);
        response.end();
    }
  }
  
  /* ************************************************** */
  /* Main block
  /* ************************************************** */
  var http = require('http');
  var fs = require("fs");
  const file = "form1.html";
  
  http.createServer(onRequest_8080).listen(8080);
  http.createServer(onRequest_8081).listen(8081);
  console.log("The server was started on port 8080 and 8081");
  console.log("To stop the server, press 'CTRL + C'");