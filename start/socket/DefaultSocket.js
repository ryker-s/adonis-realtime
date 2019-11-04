
var DefaultSocket = function (app, socket) {
  this.app = app;
  this.socket = socket;

  // Expose handler methods for events
  this.handler = {
    'deposit:ping': ping.bind(this),
  };
}

// Events
async function ping(data) {
  socket.emit('pong')
};

module.exports = DefaultSocket;
