/**
 * Created by rbwilliams on 10/12/2015.
 */
function drawCircles(){
    console.log(values);

    body = d3.select(".jumbotron");

    svg = body.append("svg")
        .attr("width", jumbotron.width() - 200)
        .attr("height", jumbotron.height());

    var circles = svg.selectAll(".circle")
        .data(values)
        .enter()
        .append("circle");

    /**********  Circle **********************/

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
        .style("fill", function(d){
            return d.color;
        });

    /**********  Circle Labels **********************/

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
                return Math.floor(d.r / 1.8);
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