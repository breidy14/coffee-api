const validarCampos = require('../middlewares/validar-campos');
const validJWT = require('../middlewares/valid-jwt');
const validRoles = require('../middlewares/valid-Role');

module.exports = {
  ...validarCampos,
  ...validJWT,
  ...validRoles,
};

/**
 * Este arichivo es solo para reunir todos los middlewares y
 * exportarlos, para importarlos desde el mismo sitio, y no tener varias
 * importaciones a puntando al mismo directorio
 */
