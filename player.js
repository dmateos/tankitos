var uuid = require('node-uuid');

var Player = function(socket) {
  var socket = socket;
  this.uuid = uuid.v4();
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.speed = 0;
};

Player.prototype = {
  get_socket: function() {
    return this.socket; 
  },

  update: function(values) {
    if(values.x) { this.x = values.x }
    if(values.y) { this.y = values.y }
    if(values.angle) { this.angle = values.angle }
    if(values.speed && values.speed != 0) { this.speed = values.speed }
  }
};

exports.Player = Player;
