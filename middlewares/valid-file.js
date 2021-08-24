const { response } = require('express');

const validFileUpload = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.miFile) {
    res.status(400).json('No hay archivo para subir');
    return;
  }

  next();
};

module.exports = {
  validFileUpload,
};
