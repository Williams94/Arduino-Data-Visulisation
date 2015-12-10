/**
 * Created by rbwilliams on 28/11/2015.
 */
$("#about").click(function(){
    window.location.href='/about.html';
});

// #FF4F64

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
        "y" : legendY + 30,
        "r" : 10,
        "color" : "#ff9999"
    } ,
    {
        "name" : "- Sound (dB)",
        "x" : legendX,
        "y" : legendY + 60,
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
                "x" : 250,
                "y" : 250,
                "r" : (receivedData[0]["light"]/5),
                "color" : legendValues[0]["color"]

            },
            {
                "name" : "Sound",
                "x" : 600,
                "y" : 250,
                "r" : receivedData[0]["sound"],
                "color" : legendValues[2]["color"]
            },
            {
                "name" : "Temp",
                "x" : 850,
                "y" : 250,
                "r" : (receivedData[0]["temperature"] * 1.8),
                "color" : legendValues[1]["color"]
            }];

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
        values[0]["r"] = receivedData[0]["light"]/5;
        values[1]["r"] = receivedData[0]["sound"];
        values[2]["r"] = receivedData[0]["temperature"]*1.8;

        reDraw();
    });
}


function reDraw(){

    var duration = 800;


    var circles = d3.selectAll("circle");

    circles
        .data(values)
        .transition()
        .attr("r", function (d, i){
            if (i == 0) {
                if (d.r < 100){
                    return d.r * 2;
                } else {
                    return d.r;
                }
            } else if (i == 1){
                return d.r;
            } else if (i == 2){
                return (d.r);
            }
        })
        .duration(duration);

    var labels = d3.selectAll("text");

    labels
        .data(values)
        .text(function (d, i){
            if (i == 0){
                return d.r * 5;
            } else if(i == 1) {
                return d.r;
            } else if (i == 2){
                return Math.floor(d.r / 1.8);
            }
        });

    var width = jumbotron.width();
    var height = 40;
    var padding = 10;

    var bars = d3.selectAll(".dataBars");

    bars
        .data(values)
        .transition()
        .attr("width", function (d, i){
            if (i == 0) {
                return ((d.r*5) / 3) + 30;
            } else if (i == 1){
                return ((d.r * 3));
            } else if (i == 2){
                return ((d.r * 5));
            }
        })
        .duration(duration);

    var barsText = d3.selectAll(".barText");

    barsText
        .data(values)
        .transition()
        .attr("x", function (d, i){
            if (i == 0) {
                return ((d.r*5) / 3) - 10;
            } else if (i == 1){
                return (width/3) + (d.r * 3) - 60;
            } else if (i == 2){
                return (width - width/3) + (d.r * 5) - 55;
            }
        })
        .duration(duration);
}


window.onload = function() {
    socketInit();
};