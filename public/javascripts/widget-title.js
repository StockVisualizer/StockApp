$(function() {
  var client = new ZeroClipboard($(".copy-button"));

  client.on("ready", function(readyEvent) {
    client.on("aftercopy", function(event) {
      alert("Copied widget to clipboard!");
    });
  });

  $('.title-form').on('submit', function(e) {
    e.preventDefault();
    symbol = $('.title-input').val();
    $('.title-input').val('');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $('.title-input').blur();
    }
    // New ticker
    flip = true;
  });
  $('.flip').dblclick(function() {
    $(".gridster ul").gridster().data('gridster').draggable().disable();
    $(this).find('.card').addClass('flipped').mouseleave(function() {
      $(this).removeClass('flipped');
      $(".gridster ul").gridster().data('gridster').draggable().enable();
    });
    return false;
  });
});