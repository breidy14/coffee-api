const { Router } = require('express');
const { check } = require('express-validator');

const {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} = require('../controllers/tables');

const { validarCampos, validJWT, hasRole, isAdmin } = require('../middlewares');
const { existTableByID } = require('../helpers');

const router = Router();

router.get('/', [validJWT], getTables);

router.post(
  '/',
  [
    validJWT,
    hasRole('ADMIN_ROLE', 'SALE_ROLE'),
    check('table', 'table: el numero de mesa es obligatorio es obligatorio')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  createTable
);

router.put(
  '/:id',
  [
    validJWT,
    hasRole('ADMIN_ROLE', 'SALE_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existTableByID),
    validarCampos,
  ],
  updateTable
);
router.delete(
  '/:id',
  [
    validJWT,
    isAdmin,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existTableByID),
    validarCampos,
  ],
  deleteTable
);

module.exports = router;
