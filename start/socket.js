const Server = use('Server')
const Config = use('Config')

const io = use('socket.io')(Server.getInstance())

const User = use('App/Models/User')

var DefaultSocket = require('./socket/DefaultSocket');

var app = {
  allSockets: []
};

io.on('connection', function (socket) {
  socket.authed = false

  // Create event handlers for this socket
  var eventHandlers = {
    DefaultSocket: new DefaultSocket(app, socket),
  };

  // Bind events to handlers
  for (var category in eventHandlers) {
    var handler = eventHandlers[category].handler;
    for (var event in handler) {
      socket.on(event, handler[event]);
    }
  }

  // Add socket to global list 
  app.allSockets.push(socket);

  socket.on('disconnect', function () {
    // Remove from global socket list
    const index = app.allSockets.findIndex(obj => obj.id === socket.id);
    app.allSockets.splice(index, 1)
  })
});
