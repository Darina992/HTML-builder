const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
  if (err) throw err;
});
let pathFrom = path.join(__dirname,'files');
let pathTo = path.join(__dirname, 'files-copy');
function copyDir(pathFrom,pathTo) {
  fs.readdir(pathFrom,{withFileTypes : true},function (err, files) {
    if(err){
      throw err;
    } else {
      files.forEach((item) => {
        fs.writeFile(
          path.join(pathTo, `${item.name}`),
          '',
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  });
}
fs.readdir(path.join(__dirname, 'files-copy'),function (err,files) {
  if(err){
    throw err;
  }
  if(files.length){
    files.forEach((item) => {
      fs.unlink(path.join(__dirname, 'files-copy',`${item}`), function(err){
        if (err) {
          console.log(err);
        }
      });
    });
  }
  copyDir(pathFrom,pathTo);
});
