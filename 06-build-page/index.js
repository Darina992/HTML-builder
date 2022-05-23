const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const assets = path.join(__dirname, 'assets');
const assetsDist = path.join(projectDist, 'assets');
const components = path.join(__dirname, 'components');
const styles = path.join(__dirname, 'styles');
const template = path.join(__dirname,'template.html');

fs.mkdir(projectDist, { recursive: true }, err => {
  if (err) throw err;
});
fs.stat(assetsDist, err => {
  if (err) {
    fs.promises.mkdir(assetsDist, { recursive: true });
    copyDir(assets,assetsDist);
  } else {
    fs.promises.rm(assetsDist, { recursive: true }).then(() => {
      fs.promises.mkdir(assetsDist, { recursive: true });
      copyDir(assets,assetsDist);
    });
  }
});

function copyDir(origin, copy) {
  fs.promises.readdir(origin, { withFileTypes: true }).then(files => {
    files.forEach(file => {
      let originFile = path.join(origin, file.name);
      let copyFile = path.join(copy, file.name);
      if (file.isDirectory()) {
        fs.promises.mkdir(copyFile, { recursive: true });
        copyDir(originFile, copyFile);
      } else if (file.isFile()) {
        fs.promises.copyFile(originFile, copyFile);
      }
    });
  });
}

fs.promises.readFile(template, 'utf-8').then(data => {
  let tags = data.match(/{{([a-z]*)}}/gi);
  tags.forEach(item => {
    let tagName = item.replace(/([^a-z]*)/gi, '');
    fs.promises.readFile(path.join(components, `${tagName}.html`),'utf-8').then(dataFile => {
      data = data.replace(item, dataFile);
      fs.promises.writeFile(path.join(projectDist, 'index.html'), data);
    });
  });

});

fs.promises.readdir(projectDist).then(data => {
  data.forEach(item => {
    if (item == 'style.css') {
      fs.promises.writeFile(path.join(projectDist,item), '');

    }
  });
});

fs.promises.readdir(styles).then(items => {
  items.forEach(item => {
    if (path.extname(item) === '.css') {
      let readableStream = fs.createReadStream(path.join(styles, item), 'utf8');
      readableStream.on('data', data => {
        fs.promises.appendFile(path.join(projectDist, 'style.css'), `\n${data}`);
      });

    }

  });
});
