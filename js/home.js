/**
 * Created by rbwilliams on 28/11/2015.
 */
$("#about").click(function(){
    window.location.href='/about.html';
});

var socket;
var values = [];
var legendX = 900;
var legendY = 80;
var legendValues = [
    {
        "name" : "- light (lux)",
        "x" : legendX,
        "y" : legendY,
        "r" : 10,
        "color" : "yellow"
    } ,
    {
        "name" : "- temperature (°C)",
        "x" : legendX,
        "y" : legendY + 30,
        "r" : 10,
        "color" : "red"
    } ,
    {
        "name" : "- sound (dB)",
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
        values = [
            {
                "name" : "light",
                "x" : 150,
                "y" : 150,
                "r" : (receivedData[0]["light"]/5),
                "color" : "yellow"
            },
            {
                "name" : "sound",
                "x" : 450,
                "y" : 150,
                "r" : receivedData[0]["sound"],
                "color" : "blue"
            },
            {
                "name" : "temp",
                "x" : 600,
                "y" : 150,
                "r" : receivedData[0]["temperature"],
                "color" : "red"
            }];

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
        values[0]["r"] = receivedData[0]["light"]/5;
        values[1]["r"] = receivedData[0]["sound"];
        values[2]["r"] = receivedData[0]["temperature"];

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
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d){
            return d.y;
        })
        .attr("r", function (d){
            return d.r;
        })
        .style("fill", function(d){
            return d.color;
        });

    var circleLabels = svg.selectAll(".circleLabel")
        .data(values)
        .enter()
        .append("text")
        .attr("class", ".circleLabel")
        .attr("x", function (d, i) {
            if (i == 0) {
                return d.x - 20;
            } else if (i == 1){
                return d.x - 12;
            } else if (i == 2){
                return d.x - 12;
            }
        })
        .attr("y", function (d, i) {
            if (i == 0) {
                return d.y + 10;
            } else if (i == 1){
                return d.y + 8;
            } else if (i == 2){
                return d.y + 5;
            }
        })
        .text(function (d, i){
            if (i == 0){
                return d.r * 5;
            } else {
                return d.r;
            }
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", function (d, i) {
            if (i == 0) {
                return "black";
            } else if (i == 1){
                return "white";
            } else if (i == 2){
                return "white";
            }
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
    var circles = d3.selectAll("circle");

    circles
        .data(values)
        .attr("r", function (d){
            return d.r;
        });

    var labels = d3.selectAll("text");

    labels
        .data(values)
        .text(function (d, i){
            if (i == 0){
                return d.r * 5;
            } else {
                return d.r;
            }
        });
}

window.onload = function() {
    socketInit();
};