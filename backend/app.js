const express = require('express');
const { exec } = require('child_process');
const app = express();
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('messageFromPython', (data) => {
    console.log('Message from Python:', data);
  });
});


app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/csvdata', (req, res) => {
  const directoryPath = path.join(__dirname, 'csv');
  let files = [];
  fs.readdir(directoryPath, (err, fileList) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading directory' });
    }
    files = fileList.filter(file => path.extname(file).toLowerCase() === '.csv');
    res.json({ files });
  });
});

app.get('/train', (req, res) => {
  exec('python ./python.ML/train.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const output = stdout.trim(); 
    res.json({ result: output });
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
