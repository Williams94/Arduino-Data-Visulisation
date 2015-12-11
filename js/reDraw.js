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
                return d.r/4;
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
                return d.r;
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
                return (d.r/2);
            } else if (i == 1){
                return ((d.r * 5));
            } else if (i == 2){
                return ((d.r * 7));
            }
        })
        .duration(duration);

    var barsText = d3.selectAll(".barText");

    barsText
        .data(values)
        .transition()
        .attr("x", function (d, i){
            if (i == 0) {
                return ((d.r) / 2) - 40;
            } else if (i == 1){
                return (width/3) + (d.r * 5) - 70;
            } else if (i == 2){
                return (width - width/3) + (d.r * 7) - 65;
            }
        })
        .duration(duration);

    var arrows = d3.selectAll(".arrow");

    arrows
        .data(values)
        .transition()
        .attr("x1", function (d, i){
            if (i == 0) {
                return (d.r/2) + 10;
            } else if (i == 1) {
                return (width/3) + (d.r * 5);
            } else if (i == 2) {
                return (width - width/3) + (d.r * 7);
            }
        })
        .attr("x2", function (d, i){
            if (i == 0) {
                return (d.r/2) + 10;
            } else if (i == 1) {
                return (width/3) + (d.r * 5);
            } else if (i == 2) {
                return (width - width/3) + (d.r * 7);
            }
        })
        .duration(duration);

    var arrowLabels = d3.selectAll(".arrowText");

        arrowLabels
            .data(values)
            .transition()
            .attr("x", function (d, i){
                if (i == 0) {
                    return (d.r/2) + 10;
                } else if (i == 1) {
                    return (width/3) + (d.r * 5);
                } else if (i == 2) {
                    return (width - width/3) + (d.r * 7);
                }
            })
            .duration(duration);

    arrowLabels
        .data(values)
        .text(function (d, i){
            if (i == 0) {
                if (d.r > 800 ){
                    return "Too bright";
                } else if (values[0]["r"] < 100){
                    return "Too dark";
                } else {
                    return "Just right";
                }
            } else if (i == 1) {
                if (values[1]["r"] > 70){
                    if (values[1]["r"]  > 100){
                        return "Very Loud";
                    }
                    return "Loud";
                }
                return "Quiet";
            } else if (i == 2) {
                if (values[2]["r"]/1.8 < 18){
                    return "Too Cold";
                } else if (values[2]["r"]/1.8 > 30){
                    return "Too Hot";
                } else {
                    return "Warm";
                }
            }
        });




    var calmMeter = d3.selectAll(".calmBar");

    calmMeter
        .data([1])
        .transition()
        .attr("y", function (d){
            return calmness() + 50;
        })
        .duration(duration);

    var calmTitle = d3.selectAll(".calmBarTitle");

    calmTitle
        .data([1])
        .text("Calmness:");



}