Tankitos.Tank = function(game, x, y, subresource) {
  this.game = game;
  this.sprite = game.add.sprite(x, y, "tanks", subresource);
  this.barrel_sprite = game.add.sprite(x-10, y-21.5, "tanks", "barrelGreen_outline.png"); 
  this.sprite.addChild(this.barrel_sprite);
  this.current_speed = 0;

  game.physics.enable(this.sprite);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.anchor.setTo(0.5, 0.5);
};

Tankitos.Tank.prototype = {
  update: function() {
    if(this.current_speed > 0) {
      this.game.physics.arcade.velocityFromRotation(
          this.sprite.rotation, 
          this.current_speed, 
          this.sprite.body.velocity
      );
      this.current_speed -= 5;
    }
  },

  fire: function() {
    var bullet = new Tankitos.Bullet(this.game, this.sprite.x, this.sprite.y, this.sprite.angle); 
  },

  set_speed: function(speed) {
    this.current_speed = speed;
  },

  set_angle: function(angle) {
    this.sprite.angle = angle;
  },

  set_x: function(x) {
    this.sprite.x = x;
  },

  set_y: function(y) {
    this.sprite.y = y;
  },

  update_angle: function(angle) {
    this.sprite.angle += angle;
  },
};
