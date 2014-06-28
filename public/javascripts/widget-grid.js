$(function() {
  var gridster;
  gridster = $('.gridster > ul').gridster({
    widget_margins: [5, 5],
    widget_base_dimensions: [300, 360],
    avoid_overlapped_widgets: true
  }).data('gridster');
  // Disable dragging widgets if the user is on a mobile device
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $(".gridster ul").gridster().data('gridster').draggable().disable();
  }
  /* 
    Set the number of columns depending on the width of the device's screen
    size
  */
  var width = $(window).width();
  if (width >= 1200) {
    window.columns = 4;
  } else if (width >= 992 && width < 1200) {
    window.columns = 3;
  } else {
    window.columns = 2;
  }
  $('.gridster').width(310 * window.columns);
});