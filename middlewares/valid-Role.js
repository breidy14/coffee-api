const { request, response } = require('express');

const isAdmin = (req = request, res = response, next) => {
  if (!req.userAuth) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token',
    });
  }

  const { role } = req.userAuth;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: 'NO TIENES PERMISO DE ESTAR AQUÍ',
    });
  }

  next();
};

// esto es un middleware que resibe parametros,
// se llama como una función normal, con los parametros, pero retorna una func que resibe (req, res, next)
const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.userAuth) {
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token',
      });
    }

    const { role } = req.userAuth;

    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdmin,
  hasRole,
};
