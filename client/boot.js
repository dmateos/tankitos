var Tankitos = {}

Tankitos.Boot = function() {

};

Tankitos.Boot.prototype = {
  init: function() {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;

    if(this.game.device.desktop) {
      this.scale.pageAlignHorizontally = true;
    } else {
      this.scale.pageAlignHorizontally = true;
    }
  },

  preload: function() {

  },

  create: function() {
      this.state.start("Preloader");
  },
};
