/**
 * Created by rbwilliams on 28/11/2015.
 */
$("#about").click(function(){
    window.location.href='/about.html';
});

var socket;
var values = [];
var legendX = 50;
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
var width = jumbotron.width();

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
                "x" : 750,
                "y" : 150,
                "r" : (receivedData[0]["temperature"] * 1.8),
                "color" : "red"
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

function drawCircles(){
    console.log(values);

    body = d3.select(".jumbotron");

    svg = body.append("svg")
        .attr("width", jumbotron.width() - 250)
        .attr("height", jumbotron.height());

    var circles = svg.selectAll(".circle")
        .data(values)
        .enter()
        .append("circle");

        circles
        .attr("class", ".circle")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d){
            return d.y;
        })
        .attr("r", function (d, i) {
            if (i == 0) {
                if (d.r < 100){
                    return 30;
                } else {
                    return d.r;
                }
            } else if (i == 1){
                return d.r;
            } else if (i == 2){
                return (d.r);
            }
        })
        .style("fill", function(d){
            return d.color;
        });

        svg.selectAll(".circleLabel")
        .data(values)
        .enter()
        .append("text")
        .attr("class", ".circleLabel")
        .attr("x", function (d, i) {
            if (i == 0) {
                return d.x - 13;
            } else if (i == 1){
                return d.x - 12;
            } else if (i == 2){
                return d.x - 12;
            }
        })
        .attr("y", function (d, i) {
            if (i == 0) {
                return d.y + 9;
            } else if (i == 1){
                return d.y + 8;
            } else if (i == 2){
                return d.y + 5;
            }
        })
        .text(function (d, i){
            if (i == 0){
                return d.r * 5;
            } else if(i == 1) {
                return d.r;
            } else if (i == 2){
                return d.r / 1.8;
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


}

function drawBars(){
    body = d3.select(".jumbotron");

    var width = jumbotron.width();
    var height = 50;
    var padding = 10;

    var barSVG = body.append("svg")
        .attr("class", ".barsvg")
        .attr("width", width)
        .attr("height", height);

    var barsContainer = barSVG.selectAll(".rect")
        .append("rect")
        .attr("class", ".barsContainer")
        .attr("x", function (d){
            return 0;
        })
        .attr("y", function (d){
            return 0;
        })
        .attr("width", function (d){
            return width;
        })
        .attr("height", function(d){
            return height;
        });

    var bars = barSVG.selectAll(".barsContainer")
        .data(values)
        .enter()
        .append("rect")
        .attr("class", ".bars")
        .attr("x", function (d, i){
            if (i == 0) {
                return padding;
            } else if (i == 1){
                return (width/3);
            } else if (i == 2){
                return (width - width/3);
            }
        })
        .attr("y", function (d){
            return 0;
        })
        .attr("width", function (d, i){
            if (i == 0) {
                return (width/3) - padding*2;
            } else if (i == 1){
                return (width/3) - padding;
            } else if (i == 2){
                return (width/3) - padding;
            }
        })
        .attr("height", function(d){
            return height;
        })
        .attr("rx", "20")
        .attr("ry","20")
        .style("fill", "lightblue")
        .style("border", "1px dashed blue");
}

function drawLegend(){

    var legendSVG = body.append("svg")
        .attr("width", 250 )
        .attr("height", jumbotron.height())/*
        .style("border-left", "1px dashed blue")*/;


    var legend = legendSVG.selectAll(".legend")
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

    var legendText = legendSVG.selectAll(".legendText")
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

    var legendTitle = legendSVG.selectAll(".legendTitle")
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
        .duration(800);

    var labels = d3.selectAll("text");

    labels
        .data(values)
        .text(function (d, i){
            if (i == 0){
                return d.r * 5;
            } else if(i == 1) {
                return d.r;
            } else if (i == 2){
                return d.r / 1.8;
            }
        });
}

window.onload = function() {
    socketInit();
};