const path = require('path');
const fs = require('fs');
const { stdout } = process;

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  (_err, directory) => {
    directory.forEach(file => {

      fs.stat(
        path.join(__dirname, 'secret-folder', file),
        (_err, stat) => {
          if (stat.isFile()) {
            const console = path.parse(path.join(__dirname, 'secret-folder', file));
            stdout.write(`${console.name} - ${console.ext.slice(1)} - ${stat.size}\n`);
          }
        });

    });
  });
