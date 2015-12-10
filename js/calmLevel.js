/**
 * Created by rbwilliams on 10/12/2015.
 */
function calmLevel() {
    var body = d3.select(".jumbotron");

    var width = 100;
    var height = 600;
    var xPadding = 10;
    var yPadding = 10;

    var meterSVG = body.append("svg")
        .attr("class", ".barsvg")
        .attr("width", width)
        .attr("height", height + yPadding);

    /*****************  Bars Container **********************/

    var barsContainer = meterSVG.selectAll(".rect")
        .append("rect")
        .attr("class", ".barsContainer")
        .attr("x", function (d) {
            return 0;
        })
        .attr("y", function (d) {
            return 0;
        })
        .attr("width", function (d) {
            return width;
        })
        .attr("height", function (d) {
            return height;
        });


    /*****************  Background Bars **********************/

    var bars = meterSVG.selectAll(".barsContainer")
        .data([1])
        .enter()
        .append("rect")
        .attr("class", ".bars")
        .attr("x", function (d, i) {
            if (i == 0) {
                return xPadding;
            } else if (i == 1) {
                return (width / 3);
            } else if (i == 2) {
                return (width - width / 3);
            }
        })
        .attr("y", function (d) {
            return yPadding;
        })
        .attr("width", function (d, i) {
            if (i == 0) {
                return (width) - xPadding * 2;
            } else if (i == 1) {
                return (width / 3) - xPadding;
            } else if (i == 2) {
                return (width / 3) - xPadding;
            }
        })
        .attr("height", function (d) {
            return height;
        })/*
         .attr("rx", "20")
         .attr("ry","20")*/
        .style("border", "1px solid black")
        .style("fill", function (d, i) {
            if (i == 0) {
                return "#F8D040";
            } else if (i == 1) {
                return "#2b5cee";
            } else if (i == 2) {
                return "#ff4d4d";
            }
        });
}