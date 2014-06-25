var dataPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var totalPoints = 10;
var gridster;
var start = true;
$(function() {
    gridster = $('.gridster > ul').gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [300, 360],
        avoid_overlapped_widgets: true
    }).data('gridster');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $(".gridster ul").gridster().data('gridster').draggable().disable();
    }
    var opts = {
        lines: 12,
        angle: 0.15,
        lineWidth: 0.44,
        pointer: {
            length: 0.9,
            strokeWidth: 0.035,
            color: '#000000'
        },
        limitMax: 'false',
        colorStart: '#6FADCF',
        colorStop: '#8FC0DA',
        strokeColor: '#E0E0E0',
        generateGradient: true
    };
    var target = document.getElementById('volume-gauge');
    var gauge = new Gauge(target).setOptions(opts);
    gauge.maxValue = 100000000;
    gauge.animationSpeed = 32;
    var width = $(window).width();
    if (width >= 1200) {
        window.columns = 4;
    } else if (width >= 992 && width < 1200) {
        window.columns = 3;
    } else {
        window.columns = 2;
    }
    $('.gridster').width(310 * window.columns);
    symbol = "AAPL";
    time = new Date().toString();
    day = time.substr(0, 3);
    // if (day != "Sat" && day != "Sun") {
    current_time = new Date().toString().substr(16, 8);
    current_time_formatted = parseInt(current_time.substr(0, 2) + current_time.substr(3, 2) + current_time.substr(6, 5));
    // if (current_time_formatted > 93000 && current_time_formatted < 160000) {
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
            var i = 0;
            while (start === true && i < dataPoints.length) {
                dataPoints[i] = price;
                i += 1;
            }
            start = false;
            if (dataPoints.length === totalPoints) {
                dataPoints = dataPoints.slice(1);
                dataPoints.push(price);
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
    $('.title-form').on('submit', function(e) {
        e.preventDefault();
        symbol = $('.title-input').val();
        $('.title-input').val('');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.title-input').blur();
        }
    });
    //   } else {
    //     $(".market-status").html("Market is closed");
    //   }
    // } else {
    //   $(".market-status").html("Market is closed");
    // }
    var socket = io();
    $('.message-form').on('submit', function() {
        socket.emit('chat message', $('#message-input').val());
        $('#message-input').val('');
        return false;
    });
    socket.on('chat message', function(msg) {
        $('#messages').prepend($('<li>').text(formatAMPM(new Date()) + ": " + msg));
    });

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    function getPrice() {
        var res = [];
        for (var i = 0; i < dataPoints.length; ++i) {
            res.push([i, dataPoints[i]]);
        }
        return res;
    }
    var plot = $.plot(".data", [getPrice()], {
        series: {
            shadowSize: 0,
            color: "green"
        },
        yaxis: {
            min: 0,
            max: 100
        },
        xaxis: {
            show: false
        },
        grid: {
            color: "black"
        }
    });
    var updateInterval = 1000;

    function update() {
        console.log(dataPoints);
        plot.setData([getPrice()]);
        plot.draw();
        setTimeout(update, updateInterval);
    }
    update();
});