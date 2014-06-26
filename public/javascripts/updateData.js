$(function() {
  symbol = "AAPL";
  time = new Date().toString();
  day = time.substr(0, 3);
  if (day != "Sat" && day != "Sun") {
    current_time = new Date().toString().substr(16, 8);
    current_time_formatted = parseInt(current_time.substr(0, 2) + current_time.substr(3, 2) + current_time.substr(6, 5));
    if (current_time_formatted > 93000 && current_time_formatted < 160000) {
      setInterval(function() {
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22" + symbol + "%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
        $.ajax({
          type: 'get',
          url: url
        }).done(function(data) {
          market_cap_string = data.query.results.quote.MarketCapitalization;
          market_cap_float = parseInt(market_cap_string.substr(0, market_cap_string.length - 1));
          market_cap = String(market_cap_float) + market_cap_string.substr(market_cap_string.length - 1);
          volume = data.query.results.quote.Volume;
          pe_ratio = data.query.results.quote.PERatio;
          price = data.query.results.quote.AskRealtime;
          if (dataPoints.length === totalPoints) {
            dataPoints = dataPoints.slice(1);
            dataPoints.push(price);
          }
          $('.updated').html("Last updated at " + formatAMPM(new Date()));

          function formatAMPM(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
            return strTime;
          }
          company_name = data.query.results.quote.Name;
          $('.market-cap-value').html("$" + market_cap);
          $('.volume-value').html(volume.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
          gauge.set(parseInt(volume));
          $('.pe-ratio-value').html(pe_ratio);
          $('.price-value').html(price);
          $('.title-h1').html(company_name);
        });

      }, 1000);
    } else {
      $(".market-status").html("Market is closed");
    }
  } else {
    $(".market-status").html("Market is closed");
  }
});