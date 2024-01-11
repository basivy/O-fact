const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
const server = app.listen(7000, () => {
  console.log('Server started on port 4000');
});
const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'], // แก้ไขตาม method ที่ใช้งาน
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});
io.sockets.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);
  sendData(socket);
})



let x = true; 
function sendData(socket) {
  if (x) {
    socket.emit('data1', Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10));
    x = !x;
  } else {
    socket.emit('data2', Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10));
    console.log(Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10));
    x = !x;
  }
  console.log(`Data is ${x}`);
  setTimeout(() => {
    sendData(socket);
  }, 1500);
}

