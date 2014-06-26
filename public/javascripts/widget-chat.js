$(function() {
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
});