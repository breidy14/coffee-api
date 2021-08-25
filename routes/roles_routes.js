const { Router } = require('express');
const { check } = require('express-validator');

const {
  getRoles,
  createRole,
  deleteRole,
  addUserRole,
} = require('../controllers/roles');
const { isValidRole, existUserByID } = require('../helpers');
const { validarCampos, isAdmin, validJWT } = require('../middlewares');

const router = Router();

router.get('/', [validJWT, isAdmin, validarCampos], getRoles);

router.post(
  '/',
  [
    validJWT,
    isAdmin,
    check('role', 'el role es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  createRole
);

router.delete(
  '/:id',
  [validJWT, isAdmin, check('id').custom(isValidRole), validarCampos],
  deleteRole
);

router.put(
  '/addroleuser/:id',
  [
    validJWT,
    isAdmin,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidRole),
    check('userId', 'No es un ID válido').isMongoId(),
    check('userId').custom(existUserByID),
    validarCampos,
  ],
  addUserRole
);

module.exports = router;
