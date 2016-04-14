var GameData = function() {
  this.players = {};
  this.entities = [];
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
  },

  each_player: function(func) {
    self = this;
    Object.keys(this.players).forEach(function(key) {
      var p = self.players[key];
      func.call(self, p);
    });
  }
};

exports.GameData = GameData;
