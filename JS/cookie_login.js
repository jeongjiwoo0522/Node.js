const http = require('http');
const fs = require('fs');
const url = require('url');

const parseCookies = (cookie = '') => 
    cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});

const server = http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if(req.url.startsWith('/login')){
        const _url = req.url;
        const name = url.parse(_url, true).query;
        const expires = new Date();
        expires.setMinutes(expires.getMinutes + 5);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)};
            Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    }
    else if(cookies.name){
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    }
    else{
        fs.readFile('../HTML/cookie_login.html', (err, data) => {
            if(err){
                throw err;
            }
            res.end(data);
        });
    }
});
server.listen(8083, () => {
    console.log('8083포트에서 서버 대기중');
});