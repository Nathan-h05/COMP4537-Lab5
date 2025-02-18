 
//ChatGPT was used to fix issues regarding file path directory and setup as well as package.json setup for digital ocean to recognize the paths

const http = require('http'); //server creation
let url = require('url'); // url parsing
//let msg = require('./lang/en/en.js')

const lab_handler = require('./lab_5.js');


const lab3_path = '/COMP4537/labs/3'
const lab4_path = '/COMP4537/labs/4/api/definition'
const lab5_path = '/COMP4537/labs/5'

//Centralized Server call
http.createServer((req, res) => {
    const requestUrl  = req.url;

    if(requestUrl.includes(lab3_path)){
        lab_handler.lab3_activate(req, res);
        return;
    } else if(requestUrl .includes(lab4_path)){ //lab 4 AJAX call
        lab_handler.lab4_activate(req, res);
        return
    } else if(requestUrl .includes(lab5_path)){ //lab 5 AJAX call
        lab_handler.lab5_activate(req, res);
        return
    } else {
        res.writeHead(404, { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' 
        });
        res.end(JSON.stringify({ message: '404 Page not found' }));
    }
}).listen(8888)

console.log('Server is running...')
