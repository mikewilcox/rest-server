// put us in a known state for our path = ?
process.chdir(__dirname);

var fs = require('fs');

var testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));