const { request, response } = require('express');
const bcrypt = require('bcrypt');

const { User } = require('../models');

const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    //ver si existe usuario

    if (!user) {
      return res.status(400).json({
        msg: 'Usuario o password incorrectos',
      });
    }

    //ver si el usuario esta activo
    if (!user.state) {
      return res.status(400).json({
        msg: 'Usuario o password incorrectos',
      });
    }
    //verificar contraseña
    const validpass = await bcrypt.compare(password, user.password);

    if (!validpass) {
      return res.status(400).json({
        msg: 'Usuario o password incorrectos',
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

const googlesignin = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    //ver si existe usuario
    if (!user) {
      //crear usuario

      data = {
        name,
        email,
        password: ':v',
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // ver si esta activo
    if (!user.state) {
      return res.status(400).json({
        msj: 'hable con administrador, usuario bloqueado',
      });
    }

    //generar JWT
    const token = await generateJWT(user.id);

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'token no valido',
    });
  }
};

module.exports = {
  login,
  googlesignin,
};
