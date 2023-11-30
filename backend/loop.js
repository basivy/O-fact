const fs = require('fs')
const { EOL } = require('os')

var delimiter = ','

const parseChunk = (text, index) => {
    if (index === 0) {
        var headerLine = text.substring(0, text.indexOf(EOL))
        text = text.replace(headerLine + EOL, '')
    }

    var lines = text.split('\n');
    for (var line of lines) {
        var values = line.split(delimiter)
        console.log(values) 
    }
    
}

const stream = fs.createReadStream('./python.ML/data.csv')
var chunkCount = 0

stream.on('data', chunk => {
    const text = chunk.toString()
    parseChunk(text, chunkCount)
    chunkCount++
})
stream.on('end', () => {
    console.log('parsing finished')
})
stream.on('error', (err) => {
    console.log('parsing error ', err)
})
