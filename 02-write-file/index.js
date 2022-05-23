const { stdin, stdout } = process;
const path = require('path');
const fs = require('fs');


fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
  }
);
stdout.write('Что вы хотите записать в файл text.txt?\n');
stdin.on('data', data => {
  if(data.toString().trim() === 'exit'){
    process.exit();
  } else {
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      data,
      err => {
        if (err) throw err;
      }
    );
  }
});
process.on('SIGINT',() =>process.exit());

process.on('exit', () => stdout.write('Удачи!'));
