Tankitos.Main = function(game) {
  this.remote_server = null;
  this.game_data = null;
};

Tankitos.Main.prototype = {
  create: function() {
    var num = Math.floor(Math.random() * (100 - 0 +1)) + 0;

    this.game.stage.backgroundColor = "#4d2600";
    this.game_data = new Tankitos.GameData();

    var tank = new Tankitos.Tank(this.game, num, num,"tankGreen_outline.png");
    this.game_data.player = new Tankitos.Player(this.game, tank);
    this.game_data.add_player(this.game_data.player);

    this.remote_server = new Tankitos.RemoteServer(this.game, this.game_data);
  },

  update: function() {
    self = this;
    this.game_data.each_player(function(player) {
      player.update();
      self.game.physics.arcade.collide(player.tank.sprite, self.game_data.get_player_sprites());
      self.game.physics.arcade.collide(player.tank.sprite, self.game_data.get_bullets_sprites(), function(obj1, obj2) {
        var emitter = self.game.add.emitter(obj1.x, obj1.y, 100);
        emitter.makeParticles("tanks", "smokeWhite1.png");
        emitter.start(true, 200, null, 3);
      });
    });
  },
};
