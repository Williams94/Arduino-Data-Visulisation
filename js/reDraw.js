/**
 * Created by rbwilliams on 10/12/2015.
 */
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
                return (width - width/3) + (d.r * 5) - 60;
            }
        })
        .duration(duration);

    var arrows = d3.selectAll(".arrow");

    arrows
        .data(values)
        .transition()
        .attr("x1", function (d, i){
            if (i == 0) {
                return ((d.r*5) / 3) + 42;
            } else if (i == 1) {
                return (width/3) + (d.r * 3);
            } else if (i == 2) {
                return (width - width/3) + (d.r * 5);
            }
        })
        .attr("x2", function (d, i){
            if (i == 0) {
                return ((d.r*5) / 3) + 42;
            } else if (i == 1) {
                return (width/3) + (d.r * 3);
            } else if (i == 2) {
                return (width - width/3) + (d.r * 5);
            }
        })
        .duration(duration);


}