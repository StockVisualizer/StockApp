$(function() {
  var client = new ZeroClipboard($(".copy-button"));

  client.on("ready", function(readyEvent) {
    client.on("aftercopy", function(event) {
      alert("Copied widget to clipboard!");
    });
  });

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $(".close").style.display = "none";
    $('.close:hover').style.display = "none";
  }

  $('.close').on('click', function(e) {
    e.preventDefault();
    this.parentNode.style.display = 'none';
  });
  $('.close1').on('click', function(e) {
    e.preventDefault();
    this.parentNode.style.display = 'none';
  });
  $('.close2').on('click', function(e) {
    e.preventDefault();
    this.parentNode.style.display = 'none';
  });
  $('.close3').on('click', function(e) {
    e.preventDefault();
    this.parentNode.style.display = 'none';
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