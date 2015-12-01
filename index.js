/**
 * Created by rbwilliams on 27/11/2015.
 */

var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandlers");
var database = require("./database");

var debug = true;

var handle = {};

handle["css"] = requestHandler.css;
handle["js"] = requestHandler.js;
handle["html"] = requestHandler.html;
handle["images"] = requestHandler.images;

server.start(router.route, handle, debug);
database.start();