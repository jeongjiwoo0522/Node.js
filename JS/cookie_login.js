const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const { parseCookies } = require('./modules.js');
const session = {};

const server = http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    //const pathname = url.parse(_url, true).pathname;
    const pathname = url.parse(req.url, true).pathname;
    if(pathname === '/login'){
       const { query } = url.parse(req.url);
       const { name } = qs.parse(query);
       const expires = new Date();
       expires.setMinutes(expires.getMinutes() + 1);   
       res.writeHead(302, {
           Location: '/',
           'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
       res.end();
    } else if(cookies.name){
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        fs.readFile('../HTML/cookie_login.html', (err, data) => {
            if(err){
                throw err;
            }
            res.end(data);
        });
    }
});

server.listen(8083, () => {
    console.log('server on 8083');
});