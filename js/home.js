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

var jumbotron = $(".jumbotron");

function socketInit(){
    socket  = io.connect("http://localhost:8080");
    socket.on('data', function (recievedData) {
        for (var key in recievedData[0]){
            if (recievedData[0].hasOwnProperty(key) && key != "_id" && key != "date" && key != "time" && key != "temperature"){
                values.push(recievedData[0][key]);
            }
        }
        values.push(recievedData[0]["temperature"]);

        light = values[0];
        temp = values[2];
        sound = values[3];
        date = recievedData[0]["date"];
        time = recievedData[0]["time"];
        draw();

        update(socket);
    });
}

function update(socket){
    socket.on("newValue", function(){
        console.log("new value");
       socket.emit("update");
    });
    socket.on("update", function (data) {
       console.log("updated" + " " + data);
    });
}

function draw(){
    console.log(values);

    var body = d3.select(".jumbotron");

    var svg = body.append("svg")
        .attr("width", jumbotron.width())
        .attr("height", jumbotron.height())
        .style("border", "1px solid black");

    var circles = svg.selectAll("circle")
        .data(values)
        .enter()
        .append("circle");

    var circleAtt = circles
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
                color = "red";
            } else if (i == 2){
                color = "blue";
            }
            return color;
        });

}

window.onload = function() {
    socketInit();
};