Tankitos.Main = function(game) {
  this.remote_server = null;
  this.game_data = null;
};

Tankitos.Main.prototype = {
  create: function() {
    var num = Math.floor(Math.random() * (100 - 0 +1)) + 0;

    this.game.world.setBounds(0, 0, 3500, 3500);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
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
        //obj1.damage(1);
        obj2.destroy();

        /*
        if(obj1.health == 0 && obj1 == self.game_data.player.tank.sprite) {
          var tank = new Tankitos.Tank(self.game, 0, 0,"tankGreen_outline.png");
          self.game_data.player = new Tankitos.Player(self.game, tank);
          self.game_data.add_player(self.game_data.player);
          delete self.game_data.get_player(obj2.uuid);
        }
        */
      });
    });
  },
};
