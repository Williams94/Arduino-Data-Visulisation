/**
 * Created by rbwilliams on 27/11/2015.
 */

var fs = require('fs');
server = require("./server");


function home(response) {
    console.log("Home page requested");
    response.writeHead(200, {"Content-Type" : "text/html"});
    var html = fs.readFileSync(__dirname + "/html/home.html");
    response.end(html);
}

function index(response) {
    console.log("index page requested");
    response.writeHead(200, {"Content-Type" : "text/html"});
    var html = fs.readFileSync(__dirname + "/html/index.html");
    response.end(html);
}

function bootstrap(response){
    console.log("bootstrap page requested");
    response.writeHead(200, {"Content-Type" : "text/html"});
    var html = fs.readFileSync(__dirname + "/html/bootstrap.html");
    response.end(html);
}

function css(response, pathname){
    console.log("Request for: " + pathname);
    response.writeHead(200, {"Content-Type" : "text/css"});
    var cs = fs.readFileSync(__dirname + pathname);
    response.end(cs);
}

function js(response, pathname){
    console.log("Request for: " + pathname);
    response.writeHead(200, {"Content-Type" : "text/js"});
    var js = fs.readFileSync(__dirname + pathname);
    response.end(js);
}

function html(response, pathname){
    console.log("Request for: " + pathname);
    response.writeHead(200, {"Content-Type" : "text/html"});
    var html = fs.readFileSync(__dirname + "/html/" + pathname);
    response.end(html);
}



exports.home = home;
exports.index = index;
exports.bootstrap = bootstrap;
exports.css = css;
exports.js = js;
exports.html = html;

