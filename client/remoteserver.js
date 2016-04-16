Tankitos.RemoteServer = function(game, game_data) {
  this.game = game;
  this.game_data = game_data;
  this.socket = io();

  this.socket.on("new_uuid", this.handle_new_uuid.bind(this));
  this.socket.on("player_update", this.handle_player_update.bind(this));
  this.socket.on("player_quick_update", this.handle_player_quick_update.bind(this));
  this.socket.on("player_fire", this.handle_player_fire.bind(this));
  this.socket.on("player_disconnect", this.handle_player_disconnect.bind(this));
  this.socket.on("new_entity", this.handle_new_entity.bind(this));

  this.game_data.player.events.on("position update", this.send_quick_update.bind(this, this.game_data.player));
  this.game_data.player.events.on("fire", this.send_fire.bind(this));

  window.setInterval(this.send_updates.bind(this, false), 5000);
};

Tankitos.RemoteServer.prototype = {
  handle_new_uuid: function(packet) {
    this.game_data.player.uuid = packet.uuid; 
  },

  handle_player_update: function(packet) {
    var player = this.game_data.get_player(packet.uuid);
    if(player) {
      player.update(packet);
    } else {
      var tank = new Tankitos.Tank(this.game, 10, 10, "tankGreen_outline.png");
      var player = new Tankitos.Player(this.game, tank, false);

      player.uuid = packet.uuid;
      this.game_data.add_player(player);
    }
  },

  handle_player_quick_update: function(packet) {
    var player = this.game_data.get_player(packet.uuid);
    player.quick_update(packet);
  },

  handle_player_fire: function(packet) {
    var player = this.game_data.get_player(packet.uuid);
    player.update(packet);
    player.tank.fire();
  },

  handle_player_disconnect: function(packet) {
    this.game_data.delete_player(packet.uuid);
  },

  handle_new_entity: function(packet) {
    var sprite = this.game.add.sprite(packet.x, packet.y, "tanks", "treeSmall.png");
    game.physics.enable(sprite);
  },

  send_fire: function() {
    this.socket.emit("player_fire", this.game_data.player.get_values());
  },

  send_updates: function() {
    this.socket.emit("player_update", this.game_data.player.get_values());
  },

  send_quick_update: function(player) {
    this.socket.emit("player_quick_update", this.game_data.player.get_values());
  }
};
