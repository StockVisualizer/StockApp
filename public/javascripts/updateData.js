var symbol = "AAPL";
$(function() {
  // Set the default ticker to AAPL
  time = new Date().toString();
  day = time.substr(0, 3);
  // If the market is closed, then do not grab stock data from Yahoo
  // if (day != "Sat" && day != "Sun") {
    current_time = new Date().toString().substr(16, 8);
    current_time_formatted = parseInt(current_time.substr(0, 2) + current_time.substr(3, 2) + current_time.substr(6, 5));
    // The market is open from 9:30 AM to 4:00 PM Eastern Standard Time
    // if (current_time_formatted > 93000 && current_time_formatted < 160000) {
      setInterval(function() {
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22" + symbol + "%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
        $.ajax({
          type: 'get',
          url: url
        }).done(function(data) {
          /* 
            Every second, grab the market capitalization, volume, and
            price/earnings ratio
          */
          if (data.query.results === null) {
            $('.title_main-h1').html("Try Again");
          } else {
            market_cap_string = data.query.results.quote.MarketCapitalization;
            if (market_cap_string === null || market_cap_string === "0.00") {
              console.log("No market cap");
              $('.market-cap-value').html("Null");
            } else {
              market_cap_float = parseInt(market_cap_string.substr(0, market_cap_string.length - 1));
              market_cap = String(market_cap_float) + market_cap_string.substr(market_cap_string.length - 1);
              $('.market-cap-value').html("$" + market_cap);
            }
            volume = data.query.results.quote.Volume;
            if (volume === null || volume === "0.00") {
              console.log("Volume not found");
              $('.volume-value').html("Null");
            } else {
              $('.volume-value').html(volume.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
              gauge.set(parseInt(volume));
            }
            pe_ratio = data.query.results.quote.PERatio;
            if (pe_ratio === null || pe_ratio === "0.00") {
              console.log("PE Ratio not found");
              $('.pe-ratio-value').html("Null");
            } else {
              $('.pe-ratio-value').html(pe_ratio);
            }
            company_name = data.query.results.quote.Name;
            if (company_name === undefined) {
              console.log("Company not found");
              $('.title_main-h1').html("Try Again");
            } else {
              $('.title_main-h1').html(company_name);
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
          }
        });
      }, 1000);
  //   } else {
  //     $('.title_main-h1').hide();
  //     $(".market-status").html("Market is closed");
  //     $('.market-cap').hide();
  //     $('.volume').hide();
  //     $('.title_main').append('<h6>(Please come back between 9:30 AM and 4:00 PM EST)</h6>');
  //     $('.price').hide();
  //     $('.pe-ratio').hide();
  //     $('.title_main-input').hide();
  //     $('.chat').hide();
  //   }
  // } else {
  //   $('.title_main-h1').hide();
  //   $(".market-status").html("Market is closed");
  //   $('.title_main').append('<h6>Please come back between 9:30 AM and 4:00 PM EST</h6>');
  //   $('.market-cap').hide();
  //   $('.volume').hide();
  //   $('.price').hide();
  //   $('.pe-ratio').hide();
  //   $('.title_main-input').hide();
  //   $('.chat').hide();
  // }
});