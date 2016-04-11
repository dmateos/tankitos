Tankitos.Preloader = function(game) {
  this.ready = false;
};

Tankitos.Preloader.prototype = {
  preload: function() {
    this.load.atlas("tanks", "client/images/tanks.png", "client/images/tanks.json");
  },

  create: function() {
    this.ready = true;
    this.state.start("Main");
  },
};
