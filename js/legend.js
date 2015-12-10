/**
 * Created by rbwilliams on 10/12/2015.
 */

function drawLegend(){

    var legendSVG = body.append("svg")
        .attr("width", 350)
        .attr("height", jumbotron.height() - 40)/*
     .style("border-left", "1px dashed blue")*/;

    /**********  Legend Circles **********************/

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

    /**********  Legend Text **********************/

    var legendText = legendSVG.selectAll(".legendText")
        .data(legendValues)
        .enter()
        .append("text")
        .attr("class", ".legendText")
        .attr("x", function (d){
            return d.x + 15;
        })
        .attr("y", function (d){
            return d.y + 5;
        })
        .text(function (d){
            return d.name;
        })
        .attr("font-family", "Verdana, Geneva, sans-serif")
        .attr("font-size", "30px")
        .attr("fill", "black");

    /**********  Legend Title **********************/

    var legendTitle = legendSVG.selectAll(".legendTitle")
        .data([1])
        .enter()
        .append("text")
        .attr("class", ".legendTitle")
        .attr("x", legendValues[0]["x"] - 15)
        .attr("y", legendValues[0]["y"] - 30)
        .text("Legend:")
        .attr("font-family", "Verdana, Geneva, sans-serif")
        .attr("font-size", "30px")
        .attr("fill", "black");
}
