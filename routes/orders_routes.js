const { Router } = require('express');
const { check } = require('express-validator');

const { getOrders, getOrder, createOrder } = require('../controllers/orders');

const { validarCampos, validJWT, hasRole } = require('../middlewares');
const { existProductByID } = require('../helpers');

const router = Router();

router.get('/', [validJWT, hasRole('ADMIN_ROLE', 'SALE_ROLE')], getOrders);

router.get('/:id', [validJWT], getOrder);

router.post(
  '/',
  [
    validJWT,
    check('orderType', 'el tipo de orden es obligatorio').not().isEmpty(),
    check('products', 'productos obligatorios').not().isEmpty(),
    check('products').custom((p) => existProductByID(p)),
    validarCampos,
  ],
  createOrder
);

/* router.put(
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
    validarCampos,
  ],
  deleteTable
);
*/
module.exports = router;
