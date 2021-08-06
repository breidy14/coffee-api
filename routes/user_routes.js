const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const {
  isValidRole,
  existEmail,
  existUserByID,
} = require('../helpers/db-validators');

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
    check('role', 'Rol obligatorio').not().isEmpty(), //esta validación es para que el rolo sea obligatorio al crear un nuevo user,
    check('role').custom(isValidRole),
    validarCampos,
  ],
  createUser
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserByID),
    check('role').custom(isValidRole),
    validarCampos,
  ],
  updateUser
);

router.delete(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserByID),
  ],
  deleteUser
);

module.exports = router;
