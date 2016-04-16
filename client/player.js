Tankitos.Player = function(game, tank, local = true) {
  this.tank = tank;
  this.local = local;
  this.uuid = "";
  this.events = new Tankitos.EventManager();
  this.health = 1000;

  if(this.local) {
    this.cursors = game.input.keyboard.createCursorKeys();
    this.cursors.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.cursors.space.onDown.add(this.on_fire, this);
  }
};

Tankitos.Player.prototype = {
  update: function(values) {
    if(this.local) {
      if(this.cursors.left.isDown) {
        this.tank.update_angle(-4);
        this.events.notify("position update", this);
      } else if(this.cursors.right.isDown) {
        this.tank.update_angle(4);
        this.events.notify("position update", this);
      } else if(this.cursors.up.isDown) {
        this.tank.set_speed(300);
        this.events.notify("position update", this);
      }
    } else {
      if(values && values.angle) { this.tank.set_angle(values.angle); }
      if(values && values.x) { this.tank.set_x(values.x); }
      if(values && values.y) { this.tank.set_y(values.y); }
    }
    this.tank.update();
  },

  on_fire: function(p) {
    this.tank.fire();
    this.events.notify("fire", this);
  },

  quick_update: function(values) {
      if(values && values.speed) { this.tank.set_speed(values.speed); }
      if(values && values.angle) { this.tank.set_angle(values.angle); }
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
