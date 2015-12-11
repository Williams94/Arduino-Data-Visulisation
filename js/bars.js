/**
 * Created by rbwilliams on 10/12/2015.
 */
function drawBars(){
    var body = d3.select(".jumbotron");

    var width = jumbotron.width();
    var height = 40;
    var xPadding = 10;
    var yPadding = 100;

    var barSVG = body.append("svg")
        .attr("class", ".barsvg")
        .attr("width", width)
        .attr("height", height  + yPadding);

    /*****************  Bars Container **********************/

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


    /*****************  Background Bars **********************/

    var bars = barSVG.selectAll(".barsContainer")
        .data([1, 2, 3, 4])
        .enter()
        .append("rect")
        .attr("class", ".bars")
        .attr("x", function (d, i){
            if (i == 0) {
                return xPadding;
            } else if (i == 1){
                return (width/3);
            } else if (i == 2){
                return (width - width/3);
            }
        })
        .attr("y", function (d){
            return yPadding;
        })
        .attr("width", function (d, i){
            if (i == 0) {
                return (width/3) - xPadding*2;
            } else if (i == 1){
                return (width/3) - xPadding;
            } else if (i == 2){
                return (width/3) - xPadding;
            }
        })
        .attr("height", function(d){
            return height;
        })/*
         .attr("rx", "20")
         .attr("ry","20")*/
        .style("border", "1px solid black")
        .style("fill",  function (d, i){
            if (i == 0) {
                return "#F8D040";
            } else if (i == 1){
                return "#6666ff";
            } else if (i == 2){
                return "#ff4d4d";
            }
        });

    /*****************  Measurement Bars **********************/


    var movingBars = barSVG.selectAll(".barsContainer")
        .data(values)
        .enter()
        .append("rect")
        .attr("class", "dataBars")
        .attr("x", function (d, i){
            if (i == 0) {
                return xPadding;
            } else if (i == 1){
                return (width/3);
            } else if (i == 2){
                return (width - width/3);
            }
        })
        .attr("y", function (d){
            return yPadding + 6;
        })
        .attr("width", function (d, i){
            if (i == 0) {
                return ((d.r) / 2) + 30;
            } else if (i == 1){
                return ((d.r * 5));
            } else if (i == 2){
                return ((d.r * 7));
            }
        })
        .attr("height", function(d){
            return height/1.5;
        })/*
        .attr("rx", "20")
        .attr("ry","20")*/
        .style("fill", function (d, i) {
            if (i == 0) {
                return d.color;
            } else if (i == 1) {
                return d.color;
            } else if (i == 2) {
                return d.color;
            }
        });
    /****************  Bar Text  ***************************/

    var barText = barSVG.selectAll("dataBars")
        .data(values)
        .enter()
        .append("text")
        .attr("class", "barText")
        .attr("x", function (d, i){
            if (i == 0) {
                return ((d.r) / 2) - 10;
            } else if (i == 1){
                return (width/3) + (d.r * 5) - 70;
            } else if (i == 2){
                return (width - width/3) + (d.r * 7) - 65;
            }
        })
        .attr("y", function (d){
            return yPadding + 27;
        })
        .text(function (d){
            return d.name;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");

    /*****************  Arrow Head *****************************/

    var defs = svg.append("defs");

    defs.append("marker")
        .attr({
            "id":"arrow",
            "viewBox":"0 -5 10 10",
            "refX":5,
            "refY":0,
            "markerWidth":4,
            "markerHeight":4,
            "orient":"auto"
        })
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class","arrowHead");

    /**********  Lines with Arrow Heads **********************/

    var barArrows = barSVG.selectAll("dataBars");

    barArrows
        .data(values)
        .enter()
        .append("line")
        .attr("class", "arrow")
        .attr("marker-end", "url(#arrow)")
        .attr("x1", function (d, i){
            if (i == 0) {
                return ((d.r) / 2) + 42;
            } else if (i == 1) {
                return (width/3) + (d.r * 5);
            } else if (i == 2) {
                return (width - width/3) + (d.r * 7);
            }
        })
        .attr("y1", height + 10)
        .attr("x2", function (d, i){
            if (i == 0) {
                return ((d.r) / 2) + 42;
            } else if (i == 1) {
                return (width/3) + (d.r * 5);
            } else if (i == 2) {
                return (width - width/3) + (d.r * 7);
            }
        })
        .attr("y2", yPadding)
        .attr("stroke-width", 5)
        .attr("stroke", "black");

    /**********  Arrow Text **********************/
    var arrowText = barSVG.selectAll("arrow");

    arrowText
        .data(values)
        .enter()
        .append("text")
        .attr("class", "arrowText")
        .attr("x", function (d, i){
            if (i == 0) {
                return ((d.r) / 2) + 42;
            } else if (i == 1) {
                return (width/3) + (d.r * 5);
            } else if (i == 2) {
                return (width - width/3) + (d.r * 7);
            }
        })
        .attr("y", function (d){
            return height;
        })
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
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "25px")
        .attr("fill", "black");

    var xValues = barSVG.selectAll("dataBars")
        .data([1,2,3,4,5,6])
        .enter()
        .append("text")
        .attr("class", "barText")
        .attr("x", function (d, i){
            if (i == 0) {
                return (10);
            } else if (i == 1){
                return (width/3) +10;
            } else if (i == 2){
                return (width - width/3) + 10;
            } else if (i == 3){
                return 590;
            } else if (i == 4){
                return (width/3) + 600;
            } else if ( i == 5){
                return width - 40;
            }
        })
        .attr("y", function (d,i){
            if (i == 0) {
                return (yPadding - 5);
            } else if (i == 1){
                return (yPadding - 5);
            } else if (i == 2){
                return (yPadding - 5);
            } else if (i == 3){
                return (yPadding - 5);
            } else if (i == 4){
                return (yPadding - 5);
            } else if ( i == 5){
                return (yPadding - 5);
            }
        })
        .text(function (d,i){
            if (i == 0) {
                return "0";
            } else if (i == 1){
                return "0";
            } else if (i == 2){
                return "0";
            } else if (i == 3){
                return 1000;
            } else if (i == 4){
                return 120;
            } else if ( i == 5){
                return 50;
            }
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "25px")
        .attr("fill", "black");

}