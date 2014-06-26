// var dataPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var dataPoints;
var totalPoints = 10;
var flip = false;
var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22AAPL%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
$(function() {
    $.ajax({
        type: 'get',
        url: url
    }).done(function(data) {
        price = data.query.results.quote.AskRealtime;
        dataPoints = [price, price, price, price, price, price, price, price, price, price];

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
                min: price * 0.99,
                max: price * 1.01,
                tickDecimals: 1,
                tickSize: .5,
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
});