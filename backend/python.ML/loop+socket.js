const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();
const server = require('http').createServer(app); // Create a server for Socket.IO
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
const PORT = 4000; // process.env.PORT || 
let lastFileSize = 0;
const rows = [];
const filePath = './random_output.csv';

app.use(express.json());

// Socket.IO Connection Event


// Function to Read CSV File
function readCSVFile() {
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
        io.emit('lastRowValues', values); // Emit to all connected clients
      });

    lastFileSize = currentFileSize;
  }
}

// Endpoint to Send Last Row Data
app.get('/sendData', (req, res) => {
  const lastRow = rows[rows.length - 1];
  const values = Object.values(lastRow);
  res.status(200).json({ lastRowValues: values });
});

// Interval for File Checking
setInterval(() => {
  readCSVFile();
}, 2000);

// Server Listening
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
