/*
esta función sirve para constrastar los datos que se envian desde el cliente,
con los que yo esoty esperado resivir.
en caso de ser así se crea un obj donde se guardan esos datos validos y se retornan al controlador
para ser utilizados, aquellos que no sean validos se ignoran
*/

function paramsBuilder(validParams, body) {
  let params = {};

  validParams.forEach((attr) => {
    if (Object.prototype.hasOwnProperty.call(body, attr))
      params[attr] = body[attr];
  });

  return params;
}

module.exports = { paramsBuilder };
