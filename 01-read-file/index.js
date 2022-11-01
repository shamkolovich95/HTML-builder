const path = require('path');
const fs = require('fs');

const reading = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

reading.on('data', data => process.stdout.write(data));
