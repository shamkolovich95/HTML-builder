const path = require('path');
const fs = require('fs');

fs.readdir(
  path.join(__dirname, 'styles'),
  async (_err, directory) => {
    await createFile();
    await directory.forEach(file => {
      checkCurrentFile(file);
    });
  });

function checkCurrentFile(file) {
  fs.stat(
    path.join(__dirname, 'styles', file),
    (_err, stat) => {
      if (stat.isFile() && file.endsWith('.css')) {
        readCurrentFile(file)
      }
    });
}

function readCurrentFile(file) {
  fs.readFile(
    path.join(__dirname, 'styles', file),
    'utf8',
    (_err, data) => appendData(data)
  );
}

function appendData(data) {
  fs.appendFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    `${data}\n`,
    () => { }
  );
}

function createFile() {
  fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    () => { }
  );
}
