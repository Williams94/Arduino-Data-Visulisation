/**
 * Created by rbwilliams on 27/11/2015.
 */

var http = require('http');
var url = require("url");
var socketio = require('socket.io');
var SerialPort = require("serialport").SerialPort;

const PORT = 8080;
var socketServer;
var serialPort;
var portName = 'COM4'; //change this to your Arduino port
var sendData = "";

function startServer(route, handle, debug){

    function onRequest(request, response){
        var path = url.parse(request.url).pathname;
        console.log("Received Request for: " + path);
        var content = route(handle, path, response, request, debug);
    }


    var httpServer = http.createServer(onRequest).listen(PORT, function(){
        console.log("Server listening on: http://localhost:%s", PORT);
    });


    serialListener(debug);
    initSocketIO(httpServer,debug);
}

function initSocketIO(httpServer, debug)
{
    socketServer = socketio.listen(httpServer);
    if(debug == false){
        socketServer.set('log level', 1); // socket IO debug off
    }
    socketServer.on('connection', function (socket) {
        console.log("user connected");
        socket.emit('onconnection', {pollOneValue:sendData});
        socketServer.on('update', function(data) {
            socket.emit('updateData',{pollOneValue:data});
        });
        socket.on('buttonval', function(data) {
            serialPort.write(data + 'E');
        });
        socket.on('sliderval', function(data) {
            serialPort.write(data + 'P');
        });

    });
}

// Listen to serial port
function serialListener(debug)
{
    var receivedData = "";
    serialPort = new SerialPort(portName, {
        baudrate: 9600,
        // defaults for Arduino serial communication
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false
    });

    serialPort.on("open", function () {
        console.log('open serial communication');
        // Listens to incoming data
        serialPort.on('data', function(data) {
            //console.log(data.toString());
            /*receivedData += data.toString();
            if (receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0) {
                sendData = receivedData .substring(receivedData .indexOf('B') + 1, receivedData .indexOf('E'));
                receivedData = '';
            }
            // send the incoming data to browser with websockets.*/
            socketServer.emit('update', sendData);
        });
    });
}

exports.start = startServer;