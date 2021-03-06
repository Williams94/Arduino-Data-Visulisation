/**
 * Created by rbwilliams on 27/11/2015.
 */

var fs = require('fs');
var server = require("./server");
var path = require("path");

var extType = {
    ".html" : "text/html",
    ".js" : "text/javascript",
    ".css" : "text/less",
    ".less" : "text/less",
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
    var js;
    if (pathname == "/js/less.js"){
        js = fs.readFileSync(__dirname + "/js/less.js/index.js");
    } else {
        js = fs.readFileSync(__dirname + pathname);
    }
    response.writeHead(200, {"Content-Type" : extType[ext]});
    response.end(js);
}

function html(response, pathname){
    console.log("Request for: " + pathname);
    var ext = path.extname(pathname);
    var html;
    response.writeHead(200, {"Content-Type" : extType[ext]});
    if (pathname == "/"){
        html = fs.readFileSync(__dirname + "/html/" + "index.html");
    } else {
        html = fs.readFileSync(__dirname + "/html/" + pathname);
    }
    response.end(html);
}

function images(response, pathname){
    console.log("Request for: " + pathname);
    var ext = path.extname(pathname);
    response.writeHead(200, {"Content-Type" : extType[ext]});
    var image = fs.readFileSync(__dirname + "/images/" + pathname);
    response.end(image);

}

exports.css = css;
exports.js = js;
exports.html = html;
exports.images = images;

