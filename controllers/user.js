const { request, response } = require('express'); //es o es nesesario, pero es para obtener el tipado y las ayudas

const getUser = async (req = request, res = response) => {
  const { q, name, page, limit } = req.query;

  res.status(200).json({
    msj: 'GET',
    name,
    page,
    limit,
  });
};

const createUser = async (req = request, res = response) => {
  const { name, edad } = req.body;
  res.status(201).json({
    msj: 'Post',
    name,
    edad,
  });
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  res.status(200).json({
    msj: 'Put',
    id,
  });
};

const deleteUser = async (req = request, res = response) => {
  res.status(200).json({
    msj: 'Delete',
  });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
