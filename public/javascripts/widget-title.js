$(function() {
  /* 
    ZeroClipboard copies text to the clipboard with an invisible Adobe Flash
    movie and a JavaScript interface.
  */
  var client = new ZeroClipboard($(".copy-button"));

  client.on("ready", function(readyEvent) {
    client.on("aftercopy", function(event) {
      alert("Copied widget to clipboard!");
    });
  });

  /* 
    If the user submits a new ticker, then prevent refresh and set the symbol
    to what the user typed in.
  */
  $('.title_main-form').on('submit', function(e) {
    prices = [];
    plot.setupGrid();
    e.preventDefault();
    symbol = $('.title_main-input').val();
    $('.title_main-input').val('');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $('.title_main-input').blur();
    }
    // New ticker
    flip = true;
  });
  /* 
    If the user double clicks on the widget, the temporarily disable dragging,
    add the css class flipped, and when the mouse leaves the widget area, then
    remove the class and reenable dragging.
  */
  $('.flip').dblclick(function() {
    $(".gridster ul").gridster().data('gridster').draggable().disable();
    $(this).find('.card').addClass('flipped').mouseleave(function() {
      $(this).removeClass('flipped');
      $(".gridster ul").gridster().data('gridster').draggable().enable();
    });
    return false;
  });
});