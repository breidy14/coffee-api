const { Router } = require('express');
const { check } = require('express-validator');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

const { validarCampos, validJWT, hasRole, isAdmin } = require('../middlewares');
const { existProductBySlug, existCategoryBySlug } = require('../helpers');

const router = Router();

router.get('/', getProducts);

router.get(
  '/:slug',
  [check('slug').custom(existProductBySlug), validarCampos],
  getProduct
);

//debe de ser privado
router.post(
  '/',
  [
    validJWT,
    hasRole('ADMIN_ROLE', 'SALE_ROLE'),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('category', 'la categoria es obligatoria').not().isEmpty(),
    check('category').custom(existCategoryBySlug),
    validarCampos,
  ],
  createProduct
);

router.put(
  '/:slug',
  [
    validJWT,
    hasRole('ADMIN_ROLE', 'SALE_ROLE'),
    check('slug').custom(existProductBySlug),
    check('category').custom(existCategoryBySlug),
    validarCampos,
  ],
  updateProduct
);
router.delete(
  '/:slug',
  [validJWT, isAdmin, check('slug').custom(existProductBySlug), validarCampos],
  deleteProduct
);

module.exports = router;
