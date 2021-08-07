const { request, response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    //ver si existe usuario

    if (!user) {
      return res.status(400).json({
        msg: 'Usuario o password incorectos',
      });
    }

    //ver si el usuario esta activo
    if (!user.state) {
      return res.status(400).json({
        msg: 'Usuario o password incorectos',
      });
    }
    //verificar contraseña
    const validpass = await bcrypt.compare(password, user.password);

    if (!validpass) {
      return res.status(400).json({
        msg: 'Usuario o password incorectos',
      });
    }

    //generar JWT
    const token = await generateJWT(user.id);
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el admin',
    });
  }
};

module.exports = {
  login,
};
