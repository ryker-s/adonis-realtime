const Server = use('Server')
const Config = use('Config')

const jwtAuth = require('socketio-jwt-auth');
const io = use('socket.io')(Server.getInstance())

const User = use('App/Models/User')

var DefaultSocket = require('./socket/DefaultSocket');

var app = {
  allSockets: []
};

io.use(jwtAuth.authenticate({
  secret: Config.get('app.appKey'),
  succeedWithoutToken: true,
}, async function (payload, done) {
  if (payload && payload.uid) {
    let user = await User.find(payload.uid)

    if (user) {
      return done(null, user);
    } else {
      return done(null, false, 'user does not exist');
    }
  } else {
    return done() // user.logged_in -> will be false
  }
}));

io.on('connection', function (socket) {

  console.log('user connected')
  if (socket.request.user) console.log(socket.request.user.logged_in);

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
