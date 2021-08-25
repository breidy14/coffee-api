const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFile = (files, img) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { miFile } = files;

      if (img) {
        //si vino img borrar de cloudinary
        const nameArr = img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');

        cloudinary.uploader.destroy(public_id); //podriamos usar await, pero como es un proceso aparte, no hace falta esperar
      }
      const { tempFilePath } = miFile;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

      resolve(secure_url);
    } catch (error) {
      reject({
        msg: 'Algo paso con cloudinary',
        error,
      });
    }
  });
};

module.exports = {
  uploadFile,
};
