Tankitos.Main = function(game) {
  this.remote_server = null;
  this.game_data = null;
};

Tankitos.Main.prototype = {
  create: function() {
    this.game.stage.backgroundColor = "#4d2600";
    this.game_data = new Tankitos.GameData();
    this.game_data.tank = new Tankitos.Tank(this.game, 10, 10, "tankGreen_outline.png");
    this.game_data.player = new Tankitos.Player(this.game, this.game_data.tank);
    this.remote_server = new Tankitos.RemoteServer(this.game, this.game_data);
  },

  update: function() {
    this.game_data.player.update(this.remote_server);
    this.game_data.tank.update();
    self = this;
    Object.keys(this.game_data.players).forEach(function(key) {
      var p = self.game_data.players[key];
      p.tank.update();
    });
  },
};
