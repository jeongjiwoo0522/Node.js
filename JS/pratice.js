const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('../HTML/server.html', (err, data) => {
        if(err){
            throw err;
        }
        res.end(data);
    });
});
server.listen(8080);    