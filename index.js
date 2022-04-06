const fs = require('fs-extra')
const prompt = require('prompt-sync')();
const path = require('path')

var startId = 123;
const keyWork = '流调';
const srcDir = '.' + path.sep;
const destDir = '.' + path.sep + 'tmp' + path.sep;

var match = function(filename) {
    if (filename.indexOf(keyWork) !== -1) {
        return true;
    }
    return false;
}

var rename = function(filename) {
    let index = filename.indexOf(keyWork) + keyWork.length;
    return filename.slice(0, index) + startId++ + filename.slice(index, -1);
}

fs.readdir(srcDir, function(err, files) {
    if (startId === 0) {
        return;
    }
    
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir);
    }

    for (index in files) {
        let filename = files[index];
        fs.stat(srcDir + filename, (err, stats) => {
            if (stats.isDirectory() && match(filename)) {
                let newFilename = rename(filename);
                const choice = prompt(filename + ' will be rename to ' + newFilename + ' : y/n ');
                if (choice === 'y') {
                    fs.copy(srcDir + path.sep + filename, destDir + path.sep + newFilename);
                }
            }
        })
    }
  });