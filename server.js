/**
 * Created by rbwilliams on 27/11/2015.
 */

var http = require('http');
var url = require("url");
var io = require('socket.io');
var SerialPort = require("serialport").SerialPort;
var db = require("./database.js");

const PORT = 8080;
var socketServer;
var serialPort;
var portName = 'COM4'; //change this to your Arduino port
//var sendData = "";

function startServer(route, handle, debug){

    function onRequest(request, response){
        var path = url.parse(request.url).pathname;
        console.log("Received Request for: " + path);
        var content = route(handle, path, response, request, debug);
    }


    var httpServer = http.createServer(onRequest).listen(PORT, function(){
        console.log("Server listening on: http://localhost:%s", PORT);
    });


    //arduinoSerialConnection(debug);
    webSocket(httpServer,debug);
}

function webSocket(httpServer, debug)
{
    socketServer = io.listen(httpServer);
    if(debug == false){
        socketServer.set('log level', 1); // socket IO debug off
    }
    socketServer.on('connection', function (socket) {
        console.log("user connected");
        db.fetch(3, function(values){
            console.log(values);
            socket.emit("data", 1);
        });


    });
    socketServer.on('disconnect', function() {
        console.log("Client has disconnected");
    });
}

// Listen to serial port
function arduinoSerialConnection(debug)
{
    var receivedData = "";
    serialPort = new SerialPort(portName, {
        baudrate: 115200
    });

    serialPort.on("open", function () {
        console.log('open serial communication');
        // Listens to incoming data

        var sensorValues = "";

        serialPort.on('data', function(data) {
            var date = new Date();
            sensorValues = date.getUTCDate() + "/" + "12" /*date.getMonth()*/ + "/" + date.getFullYear() + " "
                            + date.getHours() + ":" + date.getMinutes() + " "
                            + data.toString().trim();


            if (sensorValues.length == 34){
                db.insert(db, sensorValues);
                sensorValues = "";
            }
        });
    });
}

exports.start = startServer;