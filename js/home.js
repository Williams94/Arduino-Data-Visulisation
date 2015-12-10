/**
 * Created by rbwilliams on 28/11/2015.
 */
$("#about").click(function(){
    window.location.href='/about.html';
});

var socket;
var values = [];
var legendX = 30;
var legendY = 60;
var legendValues = [
    {
        "name" : "- Light (lux)",
        "x" : legendX,
        "y" : legendY,
        "r" : 10,
        "color" : "#FCFC95"
    } ,
    {
        "name" : "- Temperature (°C)",
        "x" : legendX,
        "y" : legendY + 50,
        "r" : 10,
        "color" : "#ff9999"
    } ,
    {
        "name" : "- Sound (dB)",
        "x" : legendX,
        "y" : legendY + 100,
        "r" : 10,
        "color" : "#ACC5CD"
    }

];

var jumbotron = $(".jumbotron");
var width = jumbotron.width();

var body;
var svg;

function socketInit(){
    socket  = io.connect("http://localhost:8080");

    socket.on('data', function (receivedData) {
        values = [
            {
                "name" : "Light",
                "x" : 400,
                "y" : 280,
                "r" : (receivedData[0]["light"]),
                "color" : legendValues[0]["color"]

            },
            {
                "name" : "Sound",
                "x" : 800,
                "y" : 280,
                "r" : receivedData[0]["sound"],
                "color" : legendValues[2]["color"]
            },
            {
                "name" : "Temp",
                "x" : 1150,
                "y" : 280,
                "r" : (receivedData[0]["temperature"] * 1.8),
                "color" : legendValues[1]["color"]
            }];

        calmLevel();
        drawCircles();
        drawLegend();
        drawBars();

        updateValues(socket);
    });
}

function updateValues(socket){
    socket.on("newValue", function(){
        socket.emit("updateValues");
    });
    socket.on("updateValues", function (receivedData) {
        values[0]["r"] = receivedData[0]["light"];
        values[1]["r"] = receivedData[0]["sound"];
        values[2]["r"] = receivedData[0]["temperature"]*1.8;

        reDraw();
    });
}


window.onload = function() {
    socketInit();
};