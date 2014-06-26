var dataPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var totalPoints = 20;
var flip = false;
$(function() {
  function getPrice() {
    var res = [];
    for (var i = 0; i < dataPoints.length; ++i) {
      res.push([i, dataPoints[i]]);
    }
    return res;
  }
  //More plot formatting can be done by visiting here: https://flot.googlecode.com/svn/trunk/API.txt
  var plot = $.plot(".data", [getPrice()], {
    series: {
      shadowSize: 0,
      color: "white",
      lines: {
        show: true,
        fill: false,
        fillColor: "rgba(255, 255, 255, 0.8)"
      },
      points: {
        show: true,
        fill: true,
        line: true
      }
    },
    yaxis: {
      min: 90 * 0.99,
      max: 94 * 1.01,
      tickDecimals: 1,
      tickSize: 0.5,
      color: "grey",
      tickColor: "grey",
      font: {
        size: 20,
      }
    },
    xaxis: {
      show: false
    },
    grid: {
      color: "#fbb44c",
      hoverable: true
    }
  });
  var updateInterval = 1000;

  function update() {
    if (flip === true) {
      plot.getOptions().yaxes[0].min = dataPoints[dataPoints.length - 1] * 0.99;
      plot.getOptions().yaxes[0].max = dataPoints[dataPoints.length - 1] * 1.01;
    }
    plot.setData([getPrice()]);
    plot.setupGrid();
    plot.draw();
    setTimeout(update, updateInterval);
  }
  update();
});