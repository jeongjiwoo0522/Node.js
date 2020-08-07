const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const { parseCookies } = require('./modules.js');

const session = {};

const server = http.createServer((req, res) => {
   const cookies = parseCookies(req.headers.cookie);
   const { pathname } = url.parse(req.url);
   if(pathname === '/login'){
       const { query } = url.parse(req.url);
       const { name } = qs.parse(query);
       const expires = new Date();
       expires.setMinutes(expires.getMinutes() + 5);
       
       //session
       const randomInt = new Date();
       session[randomInt] = {
           name,
           expires,
       };
       res.writeHead(302, {
           Location: '/',
           'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
       });
       res.end();
   } else if(cookies.session && session[cookies.session].expires > new Date()){
       res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
       res.end(`${session[cookies.session].name}님 안녕하세요`);
   } else {
       fs.readFile('../HTML/cookie_login.html', (err, data) => {
           if(err){
               throw err;
           }
           res.end(data);
       })
   }
});

server.listen(8084, () => {
    console.log("server on 8084");
});