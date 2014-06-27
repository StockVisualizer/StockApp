/* 
  Declare a gauge variable for the volume widget. Set all of the options, like
  the color of the pointer, the fill, etc. Also, set the target, max value, and
  animation speed of the gauge. 
*/
var gauge;
$(function() {
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
    colorStart: '#7f8c8d',
    colorStop: '#7f8c8d',
    strokeColor: '#E0E0E0',
    generateGradient: true
  };
  var target = document.getElementById('volume-gauge');
  gauge = new Gauge(target).setOptions(opts);
  gauge.maxValue = 100000000;
  gauge.animationSpeed = 32;

});