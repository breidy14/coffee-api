const { Router } = require('express');
const { check } = require('express-validator');
const { updateImgCloudinary } = require('../controllers/uploads');
const { collectionAllowd } = require('../helpers');

const {
  validarCampos,
  validJWT,
  validFileUpload,
  isAdmin,
} = require('../middlewares');

const router = Router();

router.put(
  '/:collection/:id',
  [
    validJWT,
    isAdmin,
    validFileUpload,
    check('collection').custom((c) =>
      collectionAllowd(c, ['users', 'products'])
    ),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
  ],
  updateImgCloudinary
);

module.exports = router;
