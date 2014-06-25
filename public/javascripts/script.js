var gridster;
$(function() {
  gridster = $('.gridster > ul').gridster({
    widget_margins: [5, 5],
    widget_base_dimensions: [280, 360],
    avoid_overlapped_widgets: true
  }).data('gridster');
  symbol = "AAPL";
  time = new Date().toString();
  day = time.substr(0, 3);
  if (day != "Sat" && day != "Sun") {
    current_time = new Date().toString().substr(16, 8);
    current_time_formatted = parseInt(current_time.substr(0, 2) + current_time.substr(3, 2) + current_time.substr(6, 5));
    //- 93000 to 160000
    if (current_time_formatted > 83000 && current_time_formatted < 230000) {
      setInterval(function() {
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22" + symbol + "%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
        $.ajax({
          type: 'get',
          url: url
        }).done(function(data) {
          market_cap_string = data.query.results.quote.MarketCapitalization;
          market_cap_float = parseInt(market_cap_string.substr(0, market_cap_string.length - 1));
          market_cap = String(market_cap_float) + market_cap_string.substr(market_cap_string.length - 1);
          volume = data.query.results.quote.Volume.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          pe_ratio = data.query.results.quote.PERatio;
          price = data.query.results.quote.AskRealtime;
          company_name = data.query.results.quote.Name;
          $('.market-cap-value').html("$" + market_cap);
          $('.volume-value').html(volume);
          $('.pe-ratio-value').html(pe_ratio);
          $('.price-value').html(price);
          $('.title-h1').html(company_name);
        });
      }, 1000);
      $('form').on('submit', function(e) {
        e.preventDefault();
        symbol = $('input').val();
      });
    } else {
      $(".market-status").html("Market is closed");
    }
  } else {
    $(".market-status").html("Market is closed");
  }
  var socket = io();
  $('.message-form').on('submit', function(){
    socket.emit('chat message', $('#message-input').val());
    $('#message-input').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});