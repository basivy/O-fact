const fs = require('fs');
const csv = require('csv-parser');

let lastUpdatedColumns = [];
let lastFileSize = 0;
const rows = [];
const filePath = './python.ML/random_output.csv';

function readCSVFile(csvFilePath) {
    const currentFileSize = fs.statSync(csvFilePath).size;

    if (currentFileSize !== lastFileSize) {
        
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                const lastRow = rows[rows.length - 1]; // ค่าล่าสุดของ row
                console.log(lastRow); // แสดงค่าล่าสุดของ row
            });

        lastFileSize = currentFileSize;
    }
}



setInterval(() => {
    readCSVFile(filePath);
}, 100);
