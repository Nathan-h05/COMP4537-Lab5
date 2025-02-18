let url = require('url'); // url parsing
const { post } = require('./api_post.js');
const { get } = require('./api_get.js');

function addCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

exports.lab5_activate = (req, res) => {
    addCorsHeaders(res); // Add CORS headers

    let q = url.parse(req.url, true);    

    // Re-routes based on request method
    if (req.method === 'GET') {
        get(req, res);
    } else if (req.method === 'POST') {
        post(req, res);
    } else if (req.method === 'OPTIONS') { // Handle preflight (OPTIONS) request
        res.writeHead(204, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        res.end();
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ message: '404 Page not found' }));
    }

};