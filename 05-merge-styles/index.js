const path = require('path');
const fs = require('fs');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  '',
  (err) => {
    if (err) throw err;
  }
);

fs.readdir(path.join(__dirname,'styles'),{withFileTypes : true},function (err, files) {
  if(err){
    throw err;
  } else {
    files.forEach((item) => {
      if(path.extname(path.join(__dirname,'styles',`${item.name}`)) === '.css'){
        fs.readFile(
          path.join(__dirname,'styles', `${item.name}`),
          'utf-8',
          (err, data) => {
            if (err) throw err;
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'bundle.css'),
              data,
              err => {
                if (err) throw err;
              }
            );
          });
      }
    });
  }
});
