const { Router } = require('express');
const { check } = require('express-validator');

//middlewares
const { validarCampos, validJWT, isAdmin, hasRole } = require('../middlewares');

const { existEmail, existUserByID } = require('../helpers/');

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.js');

const router = Router();

router.get('/', getUser);

router.post(
  '/',
  [
    check('name', 'El nombre es oblicatorio').not().isEmpty(),
    check('email', 'Este no es un email valido').isEmail(),
    check('email').custom(existEmail),

    check('password', 'La contraseña debe ser de 8 o más caracteres').isLength({
      min: 8,
    }),
    validarCampos,
  ],
  createUser
);

router.put(
  '/:id',
  [
    validJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserByID),
    validarCampos,
  ],
  updateUser
);

router.delete(
  '/:id',
  [
    validJWT,
    isAdmin,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserByID),
  ],
  deleteUser
);

module.exports = router;
