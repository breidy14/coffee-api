const path = require('path');
const fs = require('fs');
const { request, response } = require('express');

const { User, Product } = require('../models');
const { uploadFile } = require('../helpers');

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

  try {
    const secure_url = await uploadFile(req.files, obj.img);
    obj.img = secure_url;

    await obj.save();

    res.json({
      obj,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
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
