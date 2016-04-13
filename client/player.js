Tankitos.Player = function(game, tank, local = true) {
  this.tank = tank;
  this.local = local;
  this.uuid = "";
  this.events = new Tankitos.EventManager();

  if(this.local) {
    this.cursors = game.input.keyboard.createCursorKeys();
    this.cursors.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }
};

Tankitos.Player.prototype = {
  update: function(values) {
    if(this.local) {
      if(this.cursors.left.isDown) {
        this.dirty = true;
        this.tank.update_angle(-4);
        this.events.notify("position update", this);
      } else if(this.cursors.right.isDown) {
        this.dirty = true;
        this.tank.update_angle(4);
        this.events.notify("position update", this);
      } else if(this.cursors.up.isDown) {
        this.dirty = true;
        this.tank.set_speed(300);
        this.events.notify("position update", this);
      } else if(this.cursors.space.isDown) {
        this.tank.fire();
        this.events.notify("fire", this);
      }
    } else {
      if(values && values.angle) { this.tank.set_angle(values.angle); }
      if(values && values.x) { this.tank.set_x(values.x); }
      if(values && values.y) { this.tank.set_y(values.y); }
      if(values && values.speed) { this.tank.set_speed(values.speed); }
    }
    this.tank.update();
  },

  get_values: function() {
    return {
      angle: this.tank.get_angle(),
      uuid: this.uuid,
      x: this.tank.get_x(),
      y: this.tank.get_y(),
      speed: this.tank.get_speed(),
    };
  },

  destroy: function() {
    this.tank.sprite.destroy();
  },
};
