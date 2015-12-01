/**
 * Created by rbwilliams on 28/11/2015.
 */
$("#about").click(function(){
    window.location.href='/about.html';
});

//var io = require("socket.io");
var socket;

function socketInit(){
    var test;
    socket  = io.connect("http://localhost:8080");
    socket.on('data', function (recievedData) {
        test = recievedData.test;
        console.log(test);
    });

}

window.onload = function() {
    socketInit();
};



d3.select(".jumbotron")
    .append("svg")
    .attr("width", 50)
    .attr("height", 50)
    .append("circle")
    .attr("cx", 25)
    .attr("cy", 25)
    .attr("r", 25)
    .style("fill", "purple");