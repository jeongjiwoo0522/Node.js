const express = require('express');
const server = express();
const url = require('url');

server.set('port', process.env.PORT || 3000);

server.get('/', (request, response) => {
    let host = url.parse(request.url).host;
    console.log(host);
    response.send('Home page');
});

server.get('/index', (request, response) => {
    response.send('Index page');
});

//middleware
server.use((request, response) => {
    response.type('text/plain');
    response.status(505);
    response.send('Error page');
});

server.listen(3000, () => {
    console.log('Express server started at port 3000');
});