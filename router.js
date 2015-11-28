/**
 * Created by rbwilliams on 27/11/2015.
 */

function route(handle, pathname,response,request,debug) {
    console.log("Routing Request for: " + pathname);
    //typeof probes the data type of handle[pathname]. So if
    //handle[pathname] is a function (in both type and value)
    //,then run that function.
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response,request);
    } else if (pathname.indexOf(".css") >= 0){
        handle["css"](response, pathname);
    } else if (pathname.indexOf(".js") >= 0){
        handle["js"](response, pathname);
    } else if (pathname.indexOf(".html") >= 0 ){
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