const http = require('http');
const url = require('url');
const fs = require('fs');

const users ={};

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    if(req.method === "GET") {
        if(pathname === '/'){
            res.writeHead(200);
            fs.readFile("./restFront.html", (err, data) => {
                if(err){
                    throw err;
                } else {
                    res.writeHead(200);
                    res.end(data);
                }
            });
        } else if(pathname === '/about') {
            fs.readFile("./about.html", (err, data) => {
                if(err) {
                    throw err;
                } else {
                    res.writeHead(200);
                    res.end(data);
                }
            });
        } else if(pathname === '/users') {
            res.writeHead(201, {
                'Content-Type': 'text/html; charset=utf-8',
            });
            res.end(JSON.stringify(users));
        } else {
            res.writeHead(404);
            res.end("NOT FOUND");
        }
    }
    else if((req.method === "POST")) {
        if(pathname === '/users') {
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            req.on('end', () => {
                console.log('POST body:', body);
                const { name } = JSON.parse(body);
                const id = +new Date();
                users[id] = name;
                res.writeHead(201);
                res.end("success");
            });
        } else {
            res.writeHead(404);
            res.end("NOT FOUND");
        }
    } 
    else if(req.method === 'PUT') {
        if(req.url.startsWith("/users")) {
            const key = req.url.split('/')[2];
            let body = ''
            req.on("data", (data) => {
                body += data;
            });
            req.on("end", () => {
                console.log('PUT body:', body);
                users[key] = JSON.parse(body).name;
                res.end(JSON.stringify(users));
            });
        } else {
            res.writeHead(404);
            res.end("NOT FOUND");
        }
    } else if(req.method === 'DELETE') {
        if(req.url.startsWith("/users")) {
            const key = req.url.split('/')[2];
            delete users[key];
            res.end(JSON.stringify(users));
        } else {
            res.writeHead(404);
            res.end("NOT FOUND");
        }
    } else {
        res.writeHead(404);
        res.end("NOT FOUND");
    }
});

server.listen(8085, () => {
    console.log("server on 8085");
});