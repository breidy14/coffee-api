const { Router } = require('express');
//const { check } = require('express-validator');

const {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getCategory);

router.post(
  '/',
  //[check('id_token', 'id_token es obligatorio').not().isEmpty(), validarCampos],
  createCategory
);

router.put(
  '/:slug',
  //[check('id_token', 'id_token es obligatorio').not().isEmpty(), validarCampos],
  updateCategory
);
router.delete(
  '/:slug',
  //[check('id_token', 'id_token es obligatorio').not().isEmpty(), validarCampos],
  deleteCategory
);

module.exports = router;
