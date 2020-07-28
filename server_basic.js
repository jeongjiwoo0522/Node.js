const http = require('http');
const url = require('url');

const makeServer = function(request, response) {
    let path = url.parse(request.url).pathname;
    let host = url.parse(request.url).host;
    console.log(path);  
    console.log(host);
    if(path === '/'){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Home page');
    } else if(path === '/index') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Index page');
    } else {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('error page');
    }
    response.end();
};

const server = http.createServer(makeServer);
server.listen(3000, () => {
    console.log('Node server created at port 3000');
});
