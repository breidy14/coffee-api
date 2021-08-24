const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (
  files,
  validExtension = ['jpg', 'png', 'jpeg', 'gif'],
  folder = ''
) => {
  return new Promise((resolve, reject) => {
    const { miFile } = files;
    //cortar nombre
    const nameCut = miFile.name.split('.');
    const extension = nameCut[nameCut.length - 1];

    // validar extensíon
    if (!validExtension.includes(extension)) {
      return reject(`Extensión ${extension} no es valida - ${validExtension}`);
    }

    const nameTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

    miFile.mv(uploadPath, function (err) {
      if (err) {
        return reject(err);
      }

      resolve(nameTemp);
    });
  });
};

module.exports = {
  uploadFile,
};
