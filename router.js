/**
 * Created by rbwilliams on 27/11/2015.
 */

function route(handle, pathname,response,request,debug) {
    console.log("Routing Request for: " + pathname);

    if (pathname.indexOf(".css") >= 0){
        handle["css"](response, pathname);
    } else if (pathname.indexOf(".js") >= 0){
        handle["js"](response, pathname);
    } else if (pathname.indexOf(".html") >= 0 ){
        handle["html"](response, pathname);
    } else if (pathname.indexOf(".ico") >= 0 || pathname.indexOf("png") >= 0 || pathname.indexOf("jpg") >= 0 ){
        handle["images"](response, pathname);
    } else if (pathname == "/") {
        handle["html"](response, pathname);
    }

    else {
        if(debug == true){
            console.log("No request handler found for " + pathname);
        }
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;