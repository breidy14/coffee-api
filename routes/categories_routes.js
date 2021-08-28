const { Router } = require('express');
const { check } = require('express-validator');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

const { validarCampos, validJWT, hasRole, isAdmin } = require('../middlewares');
const { existCategoryBySlug } = require('../helpers');

const router = Router();

router.get('/', getCategories);

router.get(
  '/:slug',
  [check('slug').custom(existCategoryBySlug), validarCampos],
  getCategory
);

//debe de ser privado
router.post(
  '/',
  [
    validJWT,
    hasRole('ADMIN_ROLE', 'SALE_ROLE'),
    check('name', 'el nombre es obligatorio es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  createCategory
);

router.put(
  '/:slug',
  [
    validJWT,
    hasRole('ADMIN_ROLE', 'SALE_ROLE'),
    check('slug').custom(existCategoryBySlug),
    validarCampos,
  ],
  updateCategory
);
router.delete(
  '/:slug',
  [validJWT, isAdmin, check('slug').custom(existCategoryBySlug), validarCampos],
  deleteCategory
);

module.exports = router;
