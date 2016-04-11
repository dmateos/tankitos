Tankitos.Bullet = function(game, x, y, angle) {
  this.game = game;

  this.sprite = game.add.sprite(x, y, "tanks", "bulletBeige_outline.png");
  this.sprite.angle = angle;

  game.physics.enable(this.sprite);
  this.sprite.anchor.setTo(0.5, 0.5);

  this.game.physics.arcade.velocityFromRotation(this.sprite.rotation, 500, this.sprite.body.velocity);
};

