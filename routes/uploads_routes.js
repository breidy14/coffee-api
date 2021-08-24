const { Router } = require('express');
const { check } = require('express-validator');
const { updateImgCloudinary, loadImg } = require('../controllers/uploads');
const { collectionAllowd } = require('../helpers');

const { validarCampos, validJWT, validFileUpload } = require('../middlewares');

const router = Router();

//router.post('/', [validJWT, validFileUpload, validarCampos], uploadsFile);
router.put(
  '/:collection/:id',
  [
    validJWT,
    validFileUpload,
    check('collection').custom((c) =>
      collectionAllowd(c, ['users', 'products'])
    ),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
  ],
  updateImgCloudinary
);

router.get(
  '/:collection/:id',
  [
    check('collection').custom((c) =>
      collectionAllowd(c, ['users', 'products'])
    ),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
  ],
  loadImg
);

module.exports = router;
