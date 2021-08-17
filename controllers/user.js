const { request, response } = require('express'); //es o es nesesario, pero es para obtener el tipado y las ayudas
const bcrypt = require('bcrypt');

const { User } = require('../models');
const { paramsBuilder } = require('../helpers');
const validparams = ['name', 'email', 'password', 'img', 'role'];

const getUser = async (req = request, res = response) => {
  let { limit = 5, desde = 0 } = req.query;

  if (isNaN(limit) === true) {
    limit = 5;
  }
  if (isNaN(desde) === true) {
    desde = 1;
  }

  const users = User.find({ state: true })
    .skip(Number(desde))
    .limit(Number(limit));
  const total = User.countDocuments({ state: true });

  const [resTotal, resUsers] = await Promise.all([total, users]);

  res.status(200).json({
    resTotal,
    resUsers,
  });
};

const createUser = async (req = request, res = response) => {
  const params = paramsBuilder(validparams, req.body);
  const user = new User(params);

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(params.password, salt);

  await user.save();

  res.status(201).json({
    user,
  });
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, email, ...rest } = paramsBuilder(validparams, req.body);
  const uid = req.userAuth.id;

  if (id !== uid) {
    return res.status(401).json({
      msg: 'Id incorrecto',
    });
  }

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(200).json({
    user,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.status(200).json({
    user,
  });
};

/* por si algún día quiero activar el eliminado por completo
const deleteComplitUser = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findOneAndDelete(id);

  res.status(200).json({
    user,
  });
}; */

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
