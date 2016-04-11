var GameData = function() {
  this.players = {};
};

GameData.prototype = {
  get_players: function() {
    return this.players;
  },

  add_player: function(player, socket) {
    this.players[socket.id] = player;
  },

  delete_player: function(socket) {
    delete this.players[socket.id];
  }
};

exports.GameData = GameData;
