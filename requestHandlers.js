/**
 * Created by rbwilliams on 27/11/2015.
 */

var fs = require('fs');
var server = require("./server");
var path = require("path");

var extType = {
    ".html" : "text/html",
    ".js" : "text/javascript",
    ".css" : "text/css",
    ".ico" : "image/x-icon",
    ".png" : "image/png",
    ".jpg" : "image/jpeg",
    ".jpeg" : "image/jpeg"
};

function css(response, pathname){
    console.log("Request for: " + pathname);
    var ext = path.extname(pathname);
    response.writeHead(200, {"Content-Type" : extType[ext]});
    var cs = fs.readFileSync(__dirname + pathname);
    response.end(cs);
}

function js(response, pathname){
    console.log("Request for: " + pathname);
    var ext = path.extname(pathname);
    response.writeHead(200, {"Content-Type" : extType[ext]});
    var js = fs.readFileSync(__dirname + pathname);
    response.end(js);
}

function html(response, pathname){
    console.log("Request for: " + pathname);
    var ext = path.extname(pathname);
    response.writeHead(200, {"Content-Type" : extType[ext]});
    if (pathname == "/"){
        var html = fs.readFileSync(__dirname + "/html/" + "index.html");
    } else {
        var html = fs.readFileSync(__dirname + "/html/" + pathname);
    }
    response.end(html);
}

function images(response, pathname){
    console.log("Request for: " + pathname);
    var ext = path.extname(pathname);
    response.writeHead(200, {"Content-Type" : extType[ext]});
    var image = fs.readFileSynch(__dirname + "/images/" + pathname);
    response.end(image);

}

exports.css = css;
exports.js = js;
exports.html = html;
exports.images = images;

