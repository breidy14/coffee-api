const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const validJWT = async (req = request, res = response, next) => {
  const token = req.header('z-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No esta aunteticado',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETJWTKEY);

    const userAuth = await User.findById(uid);
    if (!userAuth) {
      return res.status(401).json({
        msg: 'Usuario no existente',
      });
    }

    //verificar si el usuario tiene state true
    if (!userAuth.state) {
      return res.status(401).json({
        msg: 'Token no valido',
      });
    }

    req.userAuth = userAuth;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'No esta aunteticado',
    });
  }
};

module.exports = {
  validJWT,
};
