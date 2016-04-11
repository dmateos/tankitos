Tankitos.RemoteServer = function(game, game_data) {
  this.game = game;
  this.game_data = game_data;
  this.socket = io();

  this.socket.on("new_uuid", this.handle_new_uuid.bind(this));
  this.socket.on("player_update", this.handle_player_update.bind(this));
  this.socket.on("player_quick_update", this.handle_player_quick_update.bind(this));
  this.socket.on("player_fire", this.handle_player_fire.bind(this));
  this.socket.on("player_disconnect", this.handle_player_disconnect.bind(this));

  //window.setInterval(this.send_updates.bind(this), 30);
  window.setInterval(this.send_updates.bind(this, false), 5000);
  console.log("remote connection established");
};

Tankitos.RemoteServer.prototype = {
  handle_new_uuid: function(packet) {
    this.game_data.player.uuid = packet.uuid; 
    console.log("new_uuid from server " + this.game_data.player.uuid);
  },

  handle_player_update: function(packet) {
    var player = this.game_data.get_player(packet.uuid);
    if(player) {
      player.write_values(packet);
      console.log("player_update update player " + player.uuid);
      console.log(packet);
    } else {
      var tank = new Tankitos.Tank(this.game, 10, 10, "tankGreen_outline.png");
      var player = new Tankitos.Player(this.game, tank, false);

      player.uuid = packet.uuid;
      this.game_data.add_player(player);
      console.log("player_update new player " + packet.uuid);
    }
  },

  handle_player_quick_update: function(packet) {
    var player = this.game_data.get_player(packet.uuid);
    player.tank.set_speed(packet.speed);
    player.tank.set_angle(packet.angle);
  },

  handle_player_fire: function(packet) {
    this.handle_player_update(packet);
    var player = this.game_data.get_player(packet.uuid);
    player.tank.fire();
  },

  handle_player_disconnect: function(packet) {
    this.game_data.delete_player(packet.uuid);
  },

  send_fire: function() {
    this.socket.emit("player_fire", this.game_data.player.get_values());
  },

  send_updates: function(check_dirty = true) {
    if(check_dirty == true) {
      if(this.game_data.player.check_dirty()) {
        this.socket.emit("player_update", this.game_data.player.get_values());
      }
    } 
    else {
      this.socket.emit("player_update", this.game_data.player.get_values());
    }
  },

  send_quick_update: function(speed, angle) {
    this.socket.emit("player_quick_update", {
      uuid: this.game_data.player.uuid,
      speed: speed,
      angle: angle,
    });
  }
};
