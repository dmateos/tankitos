Tankitos.Tank = function(game, x, y, subresource) {
  this.game = game;
  this.sprite = game.add.sprite(x, y, "tanks", subresource);
  this.barrel_sprite = game.add.sprite(0, -12, "tanks", "barrelGreen_outline.png"); 
  this.sprite.addChild(this.barrel_sprite);
  this.current_speed = 0;

  game.physics.enable(this.sprite);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.anchor.setTo(0.5, 0.5);
  this.bullets = [];
};

Tankitos.Tank.prototype = {
  update: function() {
    this.game.physics.arcade.velocityFromRotation(
        this.sprite.rotation, 
        this.current_speed, 
        this.sprite.body.velocity
    );

    if(this.current_speed > 0) {
      this.current_speed -= 5;
    }
  },

  fire: function() {
    var bullet = new Tankitos.Bullet(this.game, this.sprite.x, this.sprite.y, this.sprite.angle); 
    this.bullets.push(bullet.sprite);
  },

  set_speed: function(speed) {
    this.current_speed = speed;
    return this.current_speed;
  },

  get_speed: function() {
    return this.current_speed;
  },

  set_x: function(x) {
    this.sprite.x = x;
    return this.sprite.x;
  },

  set_y: function(y) {
    this.sprite.y = y;
    return this.sprite.y;
  },

  get_x: function() {
    return this.sprite.x;
  },

  get_y: function() {
    return this.sprite.y;
  },

  set_angle: function(angle) {
    this.sprite.angle = angle;
    return this.sprite.angle;
  },
  
  update_angle: function(angle) {
    this.sprite.angle += angle;
    return this.sprite.angle;
  },

  get_angle: function(angle) {
    return this.sprite.angle;
  },
};
