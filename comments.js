//create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const comments = require('./comments');
const querystring = require('querystring');

//create server
http.createServer((req, res) => {
    //parse the url
    const urlObj = url.parse(req.url, true);
    //get the pathname
    const pathname = urlObj.pathname;
    //get the query string
    const query = urlObj.query;
    //get the method
    const method = req.method;
    //get the root path
    const root = path.resolve(__dirname, '.');

    if (pathname === '/addComment' && method === 'POST') {
        //add comment
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        }).on('end', () => {
            //parse the data
            const comment = querystring.parse(data);
            comments.addComment(comment);
            res.end('success');
        });
    } else if (pathname === '/getComments' && method === 'GET') {
        //get comments
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments.getComments()));
    } else {
        //read the file
        let filePath = path.join(root, pathname);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.end('Not Found');
            } else {
                res.end(data);
            }
        });
    }
}).listen(3000, () => {
    console.log('Server is running at http://');
}
);
