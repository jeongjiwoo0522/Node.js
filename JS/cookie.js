const http = require('http');
const dt = require('./modules');

const server = http.createServer((req, res) => {
    const cookies = dt.parseCookies(req.headers.cookie);
    console.log(req.url, cookies);
    res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
    res.end('Hello Cookie');
});
server.listen(8082, () => {
    console.log('server on 8082');
});

