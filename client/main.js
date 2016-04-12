Tankitos.Main = function(game) {
  this.remote_server = null;
  this.game_data = null;
};

Tankitos.Main.prototype = {
  create: function() {
    var num = Math.floor(Math.random() * (100 - 0 +1)) + 0;
    this.game.stage.backgroundColor = "#4d2600";
    this.game_data = new Tankitos.GameData();
    this.game_data.tank = new Tankitos.Tank(this.game, num, num,"tankGreen_outline.png");
    this.game_data.player = new Tankitos.Player(this.game, this.game_data.tank);
    this.remote_server = new Tankitos.RemoteServer(this.game, this.game_data);
  },

  update: function() {
    this.game_data.player.update(this.game_data, this.remote_server);

    self = this;
    var player = this.game_data.player;

    Object.keys(this.game_data.players).forEach(function(key) {
      var p = self.game_data.players[key];
      p.update(self.game_data, self.remote_server);
      self.game.physics.arcade.collide(self.game_data.tank.sprite, p.tank.sprite);
    });
  },

  check_collisions: function(target, group) {

  }
};
