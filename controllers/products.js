const { request, response } = require('express'); //es o es nesesario, pero es para obtener el tipado y las ayudas

//const User = require('../models/user');
//const { paramsBuilder } = require('../helpers/paramsBuilder.js');
//const validparams = ['name', 'email', 'password', 'img', 'role'];

const getCategory = async (req = request, res = response) => {
  res.status(200).json({
    msg: 'OK',
  });
};

const createCategory = async (req = request, res = response) => {
  res.status(200).json({
    msg: 'OK',
  });
};

const updateCategory = async (req = request, res = response) => {
  res.status(200).json({
    msg: 'OK',
  });
};

const deleteCategory = async (req = request, res = response) => {
  res.status(200).json({
    msg: 'OK',
  });
};

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
