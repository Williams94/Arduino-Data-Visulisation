/**
 * Created by rbwilliams on 28/11/2015.
 */
$("#about").click(function(){
    window.location.href='/about.html';
});

//var io = require("socket.io");
var socket;
var theData = [1];
var values = [];
var temp, light, sound, date, time = -1;
var legendX = 975;
var legendY = 50;
var legendValues = [
    {
        "name" : "- light",
        "x" : legendX,
        "y" : legendY,
        "r" : 10,
        "color" : "yellow"
    } ,
    {
        "name" : "- temperature",
        "x" : legendX,
        "y" : legendY + 30,
        "r" : 10,
        "color" : "red"
    } ,
    {
        "name" : "- sound",
        "x" : legendX,
        "y" : legendY + 60,
        "r" : 10,
        "color" : "blue"
    }

];

var jumbotron = $(".jumbotron");

var body;
var svg;

function socketInit(){
    socket  = io.connect("http://localhost:8080");
    socket.on('data', function (receivedData) {
        for (var key in receivedData[0]){
            if (receivedData[0].hasOwnProperty(key) && key != "_id" && key != "date" && key != "time" && key != "temperature"){
                values.push(receivedData[0][key]);
            }
        }
        values.push(receivedData[0]["temperature"]);

        /*light = values[0];
        temp = values[2];
        sound = values[3];
        date = receivedData[0]["date"];
        time = receivedData[0]["time"];*/
        draw();

        update(socket);
    });
}

function update(socket){
    socket.on("newValue", function(){
        console.log("new value");
        socket.emit("update");
    });
    socket.on("update", function (receivedData) {
        values = [];
        for (var key in receivedData[0]){
            if (receivedData[0].hasOwnProperty(key) && key != "_id" && key != "date" && key != "time" && key != "temperature"){
                values.push(receivedData[0][key]);
            }
        }
        values.push(receivedData[0]["temperature"]);
        console.log("updated" + " " + values);
        reDraw();
    });
}

function draw(){
    console.log(values);

    body = d3.select(".jumbotron");

    svg = body.append("svg")
        .attr("width", jumbotron.width())
        .attr("height", jumbotron.height())
        .style("border", "1px solid black");

    var circles = svg.selectAll(".circle")
        .data(values)
        .enter()
        .append("circle");

    var circleAtt = circles
        .attr("class", ".circle")
        .attr("cx", 150)
        .attr("cy", 150)
        .attr("r", function (d, i) {
            if (i == 0) {
                return d/5;
            } else if (i == 1){
                return d;
            } else if (i == 2){
                return d;
            }
        })
        .style("fill", function(d, i){
            var color;
            if (i == 0) {
                color = "yellow";
            } else if (i == 1){
                color = "blue";
            } else if (i == 2){
                color = "red";
            }
            return color;
        });

    var legend = svg.selectAll(".legend")
        .data(legendValues)
        .enter()
        .append("circle")
        .attr("class", ".legend")
        .attr("cx", function (d){
            return d.x;
        })
        .attr("cy", function (d){
            return d.y;
        })
        .attr("r", function (d){
            return d.r;
        })
        .style("fill", function(d){
            return d.color;
        });

    var legendText = svg.selectAll(".legendText")
        .data(legendValues)
        .enter()
        .append("text")
        .attr("class", ".legendText")
        .attr("x", function (d){
            return d.x + 20;
        })
        .attr("y", function (d){
            return d.y + 5;
        })
        .text(function (d){
            return d.name;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");

    var legendTitle = svg.selectAll(".legendTitle")
        .data([1])
        .enter()
        .append("text")
        .attr("class", ".legendTitle")
        .attr("x", legendValues[0]["x"] - 15)
        .attr("y", legendValues[0]["y"] - 30)
        .text("Legend:")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");
}

function reDraw(){
    var circles = d3.selectAll(".circle");

    circles
        .data(values)
        .attr("r", function (d, i) {
        if (i == 0) {
            return d/5;
        } else if (i == 1){
            return d;
        } else if (i == 2){
            return d;
        }
    });

    console.log(circles);
}

window.onload = function() {
    socketInit();
};