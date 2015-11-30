/**
 * Created by rbwilliams on 27/11/2015.
 */

var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandlers");
var database = require("./database");

var debug = true;

var handle = {};
handle["/"] = requestHandler.index;
handle["/home"] = requestHandler.home;
handle["/bootstrap"] = requestHandler.bootstrap;
handle["css"] = requestHandler.css;
handle["js"] = requestHandler.js;
handle["html"] = requestHandler.html;
handle["images"] = requestHandler.images;
/*handle["/css/bootstrap.css"] = requestHandler.bootstrapCSS;
handle["/js/bootstrap.min.js"] = requestHandler.bootstrapJS;*/

server.start(router.route, handle, debug);
database.start();