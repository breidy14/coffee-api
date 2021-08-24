const path = require('path');
const fs = require('fs');
const { request, response } = require('express');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { User, Product } = require('../models');
//const { uploadFile } = require('../helpers');

/* Subir archivos al server
const uploadsFile = async (req = request, res = response) => {
  try {
    const name = await uploadFile(req.files, undefined, 'imgs');

    res.json({
      name,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

  const updateImg = async (req = request, res = response) => {
  const { collection, id } = req.params;
  let obj;

  switch (collection) {
    case 'users':
      obj = await User.findById(id);
      if (!obj) {
        return res.status(404).json({ msg: `No existe usuario con id: ${id}` });
      }

      break;

    case 'products':
      obj = await Product.findById(id);
      if (!obj) {
        return res
          .status(404)
          .json({ msg: `No existe producto con id: ${id}` });
      }

      break;

    default:
      res
        .status(500)
        .json({ msg: 'se me olvido validar esto, habla con el admin' });
      break;
  }

  if (obj.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, obj.img);

    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }

  const name = await uploadFile(req.files, undefined, collection);
  obj.img = name;

  await obj.save();

  res.json({
    modelo: obj,
  });
}; */

const updateImgCloudinary = async (req = request, res = response) => {
  const { collection, id } = req.params;
  let obj;

  switch (collection) {
    case 'users':
      obj = await User.findById(id);
      if (!obj) {
        return res.status(404).json({ msg: `No existe usuario con id: ${id}` });
      }

      break;

    case 'products':
      obj = await Product.findById(id);
      if (!obj) {
        return res
          .status(404)
          .json({ msg: `No existe producto con id: ${id}` });
      }

      break;

    default:
      res
        .status(500)
        .json({ msg: 'se me olvido validar esto, habla con el admin' });
      break;
  }

  if (obj.img) {
    const nameArr = obj.img.split('/');
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');

    cloudinary.uploader.destroy(public_id); //podriamos usar await, pero como es un proceso aparte, no hace falta esperar
  }
  const { tempFilePath } = req.files.miFile;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  obj.img = secure_url;

  await obj.save();

  res.json({
    obj,
  });
};

const loadImg = async (req = request, res = response) => {
  const { collection, id } = req.params;
  let obj;

  switch (collection) {
    case 'users':
      obj = await User.findById(id);
      if (!obj) {
        return res.status(404).json({ msg: `No existe usuario con id: ${id}` });
      }

      break;

    case 'products':
      obj = await Product.findById(id);
      if (!obj) {
        return res
          .status(404)
          .json({ msg: `No existe producto con id: ${id}` });
      }

      break;

    default:
      res
        .status(500)
        .json({ msg: 'se me olvido validar esto, habla con el admin' });
      break;
  }

  if (obj.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, obj.img);

    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }

  const pathImgNotFound = path.join(__dirname, '../public/assets/no-image.jpg');
  res.sendFile(pathImgNotFound);
};

module.exports = {
  updateImgCloudinary,
  loadImg,
};
