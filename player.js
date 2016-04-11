var uuid = require('node-uuid');

var Player = function(socket) {
  var socket = socket;
  this.uuid = uuid.v4();
  this.x = 0;
  this.y = 0;
  this.angle = 0;
};

Player.prototype = {
  get_socket: function() {
    return this.socket; 
  }
};

exports.Player = Player;
