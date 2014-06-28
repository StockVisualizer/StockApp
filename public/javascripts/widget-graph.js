/*
  Set 20 data points to 0 for use in plotting the graph. Declare the plot
  variable, which stores all of the information about our graph, like the line
  color, the axes, etc. Also, set the update interval.
*/
var plot;
var prices = [];
$(document).ready(function() {
  plot = $.plot("#chart", [getPrice()], {
    series: {
      shadowSize: 0 // Drawing is faster without shadows
    },
    yaxis: {
      min: 0,
      max: 100
    },
    xaxis: {
      show: false
    },
    grid: {
      color: '#f39c12'
    }
  });
  time = new Date().toString();
  day = time.substr(0, 3);
  // If the market is closed, then do not grab stock data from Yahoo
  // if (day != "Sat" && day != "Sun") {
    current_time = new Date().toString().substr(16, 8);
    current_time_formatted = parseInt(current_time.substr(0, 2) + current_time.substr(3, 2) + current_time.substr(6, 5));
    // The market is open from 9:30 AM to 4:00 PM Eastern Standard Time
    // if (current_time_formatted > 93000 && current_time_formatted < 160000) {
      function getPrice() {
        if (prices.length > 10) {
          prices.splice(0, 1);
        }
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22" + symbol + "%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
        $.ajax({
          type: 'get',
          url: url
        }).done(function(data) {
          var price = data.query.results.quote.AskRealtime;
          if (price === undefined || price === "0.00") {
            price = data.query.results.quote.BidRealtime;
          }
          if (prices.length === 0) {
            plot.getOptions().yaxes[0].max = price * 1.1;
            plot.getOptions().yaxes[0].min = price * 0.9;
            prices.push(price);
            prices.push(price);
            prices.push(price);
            prices.push(price);
            prices.push(price);
            prices.push(price);
            prices.push(price);
            prices.push(price);
            prices.push(price);
            prices.push(price);
          } else {
            prices.push(price);
          }
        });
        var res = [];
        for (var i = 0; i < prices.length; ++i) {
          res.push([i, prices[i]]);
        }
        return res;
      }
      var updateInterval = 1000;
      function update() {
        plot.setData([getPrice()]);
        plot.setupGrid();
        plot.draw();
        setTimeout(update, updateInterval);
      }
      update();
    // }
  // }

});