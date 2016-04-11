Tankitos.Main = function(game) {
  this.remote_server = null;
};

Tankitos.Main.prototype = {
  create: function() {
    this.game_data = new Tankitos.GameData();
    this.game_data.tank = new Tankitos.Tank(this.game, 10, 10, "tankGreen_outline.png");
    this.game_data.player = new Tankitos.Player(this.game, this.game_data.tank);
    this.remote_server = new Tankitos.RemoteServer(this.game, this.game_data);
  },

  update: function() {
    this.game_data.player.update(this.remote_server);
    this.game_data.tank.update();
  },
};
