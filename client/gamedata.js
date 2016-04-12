Tankitos.GameData = function() {
  this.player = null;
  this.tank = null;
  this.players = {};
};

Tankitos.GameData.prototype = {
  get_player: function(uuid) {
    if(this.players[uuid]) {
      return this.players[uuid];
    }
    return false;
  },

  add_player: function(player) {
    this.players[player.uuid] = player;
  },

  delete_player: function(uuid) {
    this.players[uuid].destroy();
    delete this.players[uuid];
  },
};
