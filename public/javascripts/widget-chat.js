$(function() {
  // SocketIO instance
  var socket = io();
  /* 
    When a message is sent in the chat form, send the message to the server, 
    reset the form, and return false.
  */
  $('.message-form').on('submit', function() {
    socket.emit('chat message', $('#message-input').val());
    $('#message-input').val('');
    return false;
  });
  /*
    When a message is received from the server, prepend the message as an li
    to the messages list, and also put the time.
  */
  socket.on('chat message', function(msg) {
    $('#messages').prepend($('<li>').text(formatAMPM(new Date()) + ": " + msg));
  });

  // Format the time to 12 hour format
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