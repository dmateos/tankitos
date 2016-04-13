Tankitos.GameData = function() {
  this.player = null;
  this.players = {};
};

Tankitos.GameData.prototype = {
  get_player: function(uuid) {
    if(this.players[uuid]) {
      return this.players[uuid];
    }
    return false;
  },

  get_players: function() {
    return this.players;
  },

  get_player_sprites: function() {
    var self = this;
    Object.keys(this.players).map(function(key) {
      return self.players[key].tank.sprite;
    });
  },

  each_player: function(func) {
    var self = this;
    Object.keys(this.players).forEach(function(key) {
      var p = self.players[key];
      func.call(self, p); 
    });
  },

  get_bullets_sprites: function() {
    var self = this;
    Object.keys(this.players).map(function(key) {
      self.players[key].tank.bullets.map(function(b) {
        return 
      });
    });
  },

  add_player: function(player) {
    this.players[player.uuid] = player;
    return true;
  },

  delete_player: function(uuid) {
    this.players[uuid].destroy();
    delete this.players[uuid];
    return true;
  },
};
