 $(function() {
   $('.title-form').on('submit', function(e) {
     e.preventDefault();
     symbol = $('.title-input').val();
     $('.title-input').val('');
     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
       $('.title-input').blur();
     }
     // Flipped the stock
     flip = true;
   });
 });