const { Router } = require('express');
const { check } = require('express-validator');

const { login, googlesignin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  '/google',
  [check('id_token', 'id_token es obligatorio').not().isEmpty(), validarCampos],
  googlesignin
);

module.exports = router;
