const path = require('path');
const fs = require('fs');

let result = [];
fs.readdir(path.join(__dirname,'secret-folder'),{withFileTypes : true},function (err, files) {
  if(err){
    throw err;
  } else {
    files.forEach((item) => {
      if(item.isFile()){
        fs.stat(path.join(__dirname,'secret-folder',`${item.name}`), function (err, stats) {
          if(err){
            throw err;
          } else {
            let name = item.name.split('.');
            let extname = name[name.length - 1];
            let size = (stats.size/1024).toFixed(2) + 'kb';
            name.pop();
            result.push(name.join(),extname,size);
            console.log(result.join('-'));
            result =[];
          }
        });
      }
    });
  }
});
