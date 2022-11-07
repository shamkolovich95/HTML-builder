const path = require('path');
const fs = require('fs');

fs.rm(
    path.join(__dirname, 'files-copy'),
    { recursive: true },
    () => { createDirectory(); }
);

function copyFiles() {
  fs.readdir(
    path.join(__dirname, 'files'),
    (_err, directory) => {
      directory.forEach(file => {

        fs.copyFile(
          path.join(__dirname, 'files', file),
          path.join(__dirname, 'files-copy', file),
          () => {}
        );

      });
    }
  );
}

function createDirectory() {
  fs.mkdir(
    path.join(__dirname, 'files-copy'),
    { recursive: true, force: true },
    () => { copyFiles(); }
  );
}
