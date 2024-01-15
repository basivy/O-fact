const express = require('express');
const { exec } = require('child_process');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] } });
const PORT = 3000;
let rows = [];


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function readCSVFile() {
  let lastFileSize = 0;
  const rows = [];
  const filePath = './python.ML/random_output.csv';
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
        io.emit('lastRowValues', values); 
      });
    lastFileSize = currentFileSize;
  }
}



app.get('/sendData', (req, res) => {
  const lastRow = rows[rows.length - 1];
  const values = Object.values(lastRow);
  res.status(200).json({ lastRowValues: values });
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
  exec('python3 ./python.ML/train.py', (error, stdout, stderr) => {
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


setInterval(() => {
  readCSVFile();
}, 15000);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
