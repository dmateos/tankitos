var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = require("./player.js");
var gd = require("./gamedata.js");

var gd = new gd.GameData();

app.use('/client', express.static(__dirname + '/client'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

io.on("connection", function(socket) {
  var player = new players.Player(socket);
  socket.emit("new_uuid", player);
  console.log("new_uuid to client " + player.uuid);
  
  socket.broadcast.emit("player_update", player);
  console.log("player_update of " + player.uuid + " to all");

  Object.keys(gd.get_players()).forEach(function(key) {
    var p = gd.get_players()[key];
    console.log("player_update of " + p.uuid + " to " + player.uuid);
    socket.emit("player_update", p); 
  });

  gd.add_player(player, socket);

  socket.on("player_update", function(packet) {
    console.log(packet);
    player.angle = packet.angle;
    player.x = packet.x;
    player.y = packet.y;
    console.log("player_update of " + player.uuid + " to all");
    socket.broadcast.emit("player_update", player);
  });

  socket.on("player_quick_update", function(packet) {
    console.log(packet);
    socket.broadcast.emit("player_quick_update", packet);
  });

  socket.on("player_fire", function(packet) {
    player.angle = packet.angle;
    player.x = packet.x;
    player.y = packet.y;
    console.log("player_fire of " + player.uuid + " to all");
    socket.broadcast.emit("player_fire", player);
  });

  socket.on("disconnect", function() {
    console.log("player_disconnect " + player.uuid + " to all");
    socket.broadcast.emit("player_disconnect", player); 
    gd.delete_player(socket)
  });
});

setInterval(function() {
 console.log(Object.keys(gd.get_players()).length + " connected players"); 
}, 1000);

http.listen(3000, function() {
  console.log("listening on 3000");
});
