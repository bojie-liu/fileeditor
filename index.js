const fs = require('fs-extra')
const prompt = require('prompt-sync')();

const id = 123;
const keyWork = '流调';
const destDir = "./tmp/";

var match = function(filename) {
    if (filename.indexOf(keyWork) !== -1) {
        return true;
    }
    return false;
}

var rename = function(filename) {
    let index = filename.indexOf(keyWork) + keyWork.length;
    return filename.slice(0, index) + id + filename.slice(index, -1);
}

fs.readdir('./', function(err, files) {
    if (id === 0) {
        return;
    }
    
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir);
    }

    for (index in files) {
        let filename = files[index];
        fs.stat('./' + filename, (err, stats) => {
            if (stats.isDirectory() && match(filename)) {
                let newFilename = rename(filename);
                const choice = prompt(filename + ' will be rename to ' + newFilename + ' : y/n ');
                if (choice === 'y') {
                    fs.copy(filename, destDir + "/" + newFilename);
                }
            }
        })
    }
  });