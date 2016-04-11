Tankitos.Player = function(game, tank, local = true) {
  this.tank = tank;
  this.local = local;
  this.game = game;
  this.uuid = "";
  this.dirty = false;

  if(this.local) {
    this.cursors = game.input.keyboard.createCursorKeys();
    this.cursors.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }
};

Tankitos.Player.prototype = {
  update: function(server) {
    if(this.local) {
      if(this.cursors.left.isDown) {
        this.dirty = true;
        this.tank.update_angle(-4);
        server.send_quick_update(this.tank.current_speed, this.tank.sprite.angle);
      } else if(this.cursors.right.isDown) {
        this.dirty = true;
        this.tank.update_angle(4);
        server.send_quick_update(this.tank.current_speed, this.tank.sprite.angle);
      } else if(this.cursors.up.isDown) {
        this.dirty = true;
        this.tank.set_speed(300);
        server.send_quick_update(this.tank.current_speed, this.tank.sprite.angle);
      } else if(this.cursors.space.isDown) {
        this.tank.fire();
        server.send_fire();
      }
    }
  },

  check_dirty: function() {
    if(this.dirty) {
      this.dirty = false;
      return true;
    }
    return false;
  },

  write_values: function(values) {
    if(values.angle) {
      this.tank.set_angle(values.angle);
    }

    if(values.x) {
      this.tank.set_x(values.x);
    }

    if(values.y) {
      this.tank.set_y(values.y);
    }
  },

  get_values: function() {
    return {
      angle: this.tank.sprite.angle,
      uuid: this.uuid,
      x: this.tank.sprite.x,
      y: this.tank.sprite.y,
    };
  },

  destroy: function() {
    this.tank.sprite.destroy();
  },
};
