const { Router } = require('express');
const { check } = require('express-validator');

const { search, searchProductsCategory } = require('../controllers/search');
const { validarCampos } = require('../middlewares');
const { existCategoryBySlug } = require('../helpers');
const router = Router();

router.get(
  '/products-categories/:categorySlug',
  [
    check('categorySlug', 'la categoria es obligatoria').not().isEmpty(),
    check('categorySlug').custom(existCategoryBySlug),
    validarCampos,
  ],
  searchProductsCategory
);

router.get(
  '/products-categories/:categorySlug/:term',
  [
    check('categorySlug', 'la categoria es obligatoria').not().isEmpty(),
    check('categorySlug').custom(existCategoryBySlug),
    validarCampos,
  ],
  searchProductsCategory
);

router.get(
  '/:colection/:term',
  [
    check('colection', 'la colection o categoria es obligatoria')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  search
);

module.exports = router;
