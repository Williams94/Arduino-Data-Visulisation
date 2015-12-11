/**
 * Created by rbwilliams on 10/12/2015.
 */
function calmLevel() {
    var body = d3.select(".jumbotron");

    var width = 200;
    var height = 600;
    var xPadding = 10;
    var yPadding = 60;

    var meterSVG = body.append("svg")
        .attr("class", ".barsvg")
        .attr("width", width + 50)
        .attr("height", height + 50);

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

    var gradient = meterSVG
        .append("linearGradient")
        .attr("y1", yPadding)
        .attr("y2", yPadding + height)
        .attr("x1", xPadding)
        .attr("x2", xPadding + ((width) - xPadding * 2))
        .attr("id", "gradient")
        .attr("gradientUnits", "userSpaceOnUse");

    gradient
        .append("stop")
        .attr("offset", "0")
        .attr("stop-color", "#92d392");

    gradient
        .append("stop")
        .attr("offset", "0.5")
        .attr("stop-color", "#29a329");


    /*****************  Background Bars **********************/

    var bars = meterSVG.selectAll(".barsContainer")
        .data([1])
        .enter()
        .append("rect")
        .attr("class", ".bars")
        .attr("x", function () {
                return 125;
        })
        .attr("y", function () {
            return 50;
        })
        .attr("width", function () {
                return (100);
        })
        .attr("height", function (d, i) {
            if (i == 0) {
                return height;
            } else if (i == 1) {
                return height*0.67;
            } else if (i == 2) {
                return height/3;
            }

        })
         .attr("rx", "20")
         .attr("ry","20")
        .style("border", "1px solid black")
        .style("fill", function (d, i) {
            if (i == 0) {
                return "#9AA3F8";
                return "url(#gradient)";
            } else if (i == 1) {
                return "#70db70";
            } else if (i == 2) {
                return "#c2f0c2";
            }
        });

    /*****************  Calm Bars **********************/

    var movingBars = meterSVG.selectAll(".bars")
        .data([1])
        .enter()
        .append("rect")
        .attr("class", "calmBar")
        .attr("x", function (d, i){
                return 150;
        })
        .attr("y", function (d){
            return calmness() + 50;
        })
        .attr("width", function (d, i){
            return 50;
        })
        .attr("height", function(d){
            return height;
        })
         .attr("rx", "20")
         .attr("ry","20")
        .style("fill", function (d, i) {
            return "#8BF9BE";
        });

    /*****************  Calm Text **********************/

    var calmText = meterSVG.selectAll()
        .data([1, 2, 3, 4, 5])
        .enter()
        .append("text")
        .attr("x", function (d, i){
            if (i == 0){
                return 28;
            } else if (i == 1){
                return 54;
            } else if (i == 2){
                return 10;
            }
        })
        .attr("y", function (d, i){
            if (i == 0){
                return 120;
            } else if (i == 1){
                return 300;
            } else if (i == 2){
                return 500
            }
        })
        .text(function (d, i){
            if (i == 0){
                return "Peacful -";
            } else if (i == 1){
                return "Calm -";
            } else if ( i == 2){
                return "Stressful -";
            }
        })
        .attr("font-family", "Verdana, Geneva, sans-serif")
        .attr("font-size", "25px")
        .attr("fill", "black");

    /*****************  Calm Bars Title **********************/

    var calmBarTitle = meterSVG.selectAll(".calmBarTitle")
        .data([1])
        .enter()
        .append("text")
        .attr("class", ".calmBarTitle")
        .attr("x", 0)
        .attr("y", 30)
        .text("Calmness:")
        .attr("font-family", "Verdana, Geneva, sans-serif")
        .attr("font-size", "30px")
        .attr("fill", "black");


}

var calmness = function(){
    var calmLevel = 0;
    if (rotation > 1000){
        if (values[0]["r"] > 600 || values[0]["r"] < 200){
            console.log("too bright or dark");
            calmLevel += 150;
        }
        if (values[1]["r"] > 60){
            console.log("loud");
            calmLevel += 150;
            if (values[1]["r"]  > 90){
                console.log("too loud");
                calmLevel += 150;
            }
        }
        if (values[2]["r"]/1.8 < 20 || values[2]["r"]/1.8 > 28){
            console.log("too hot or cold");
            calmLevel += 150;
        }
    } else if(rotation < 100){
        if (values[0]["r"] > 900 || values[0]["r"] < 50){
            console.log("too bright or dark");
            calmLevel += 150;
        }
        if (values[1]["r"] > 80){
            console.log("loud");
            calmLevel += 150;
            if (values[1]["r"]  > 110){
                console.log("too loud");
                calmLevel += 150;
            }
        }
        if (values[2]["r"]/1.8 < 16 || values[2]["r"]/1.8 > 32){
            console.log("too hot or cold");
            calmLevel += 150;
        }
    }else {
        if (values[0]["r"] > 800 || values[0]["r"] < 100){
            console.log("too bright or dark");
            calmLevel += 150;
        }
        if (values[1]["r"] > 70){
            console.log("loud");
            calmLevel += 150;
            if (values[1]["r"]  > 100){
                console.log("too loud");
                calmLevel += 150;
            }
        }
        if (values[2]["r"]/1.8 < 18 || values[2]["r"]/1.8 > 30){
            console.log("too hot or cold");
            calmLevel += 150;
        }


    }


    return calmLevel;
};