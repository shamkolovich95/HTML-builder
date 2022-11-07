const path = require('path');
const fs = require('fs');
const { stdin, stdout } = require('process');

stdout.write('Write some text...\n');

process.on('SIGINT', () => {
  stdout.write('You close the program. Have i nice day!');
  process.exit(0);
})

fs.readdir(
  path.join(__dirname),
  (_err, files) => {
    if (!files.includes('text.txt')) {

      fs.writeFile(
        path.join(__dirname, 'text.txt'),
        '',
        () => { },
      );

    }
  }
)

stdin.on('data', content => {

  if (content.toString().slice(0, 4) === 'exit') {
    stdout.write('You close the program. Have i nice day!');
    process.exit(0);
  }

  fs.readFile(
    path.join(__dirname, 'text.txt'),
    'utf8',
    (_err, str) => {
      const file = str + content;

      fs.writeFile(
        path.join(__dirname, 'text.txt'),
        str === undefined ? content : file,
        () => { },
      );

    });
});
