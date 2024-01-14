const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
const fs = require('fs');
const csv = require('csv-parser');

let lastUpdatedColumns = [];
let lastFileSize = 0;
const rows = [];
const filePath = './random_output.csv';

const server = app.listen(4000, () => {
  console.log('Server started on port 4000');
});

const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

io.sockets.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);
  sendData(socket);
});

function sendData(socket) {
  const currentFileSize = fs.statSync(filePath).size;

  if (currentFileSize !== lastFileSize) {
    rows.length = 0;
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', () => {
        const lastRow = rows[rows.length - 1];
        const values = Object.values(lastRow);
        console.log(values);
        socket.emit('lastRowValues', values);
      });

    lastFileSize = currentFileSize;
  }

  setTimeout(() => {
    sendData(socket);
  }, 2000);
}
