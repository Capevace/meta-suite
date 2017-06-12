const socketIO = require('socket.io');
const crawlerSocket = require('./crawler');

let io;
module.exports = function setup(app) {
  io = socketIO(app);

  io.on('connection', socket => {
    console.log('Connection to /');
  });

  crawlerSocket(io.of('/crawler'));
};
