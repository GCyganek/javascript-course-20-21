const fsModule = require('fs');

const string = process.argv[2];

function checkString(stringToCheck) {
  const dirContent = fsModule.readdirSync('./');
  if (dirContent.includes(stringToCheck)) {
    if (fsModule.lstatSync(`./${stringToCheck}`).isDirectory()) {
      return 'Given string is a directory name';
    } else if (fsModule.lstatSync(`./${stringToCheck}`).isFile()) {
      const data = fsModule.readFileSync(`./${stringToCheck}`, 'utf-8');
      return `Given string is a file and here is its content:\n${data}`;
    }
  } else {
    return 'No such file or directory in this directory.';
  }
}

module.exports.checkString = checkString;

console.log(checkString(string));
