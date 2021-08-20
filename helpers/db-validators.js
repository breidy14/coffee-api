const { User, Role, Category, Product } = require('../models');

const isValidRole = async (role) => {
  if (role) {
    // esta validación es por si se llama esta func desde el metodo PUT, no sea necesario enviar el role
    const existRole = await Role.findOne({ role });

    if (!existRole) {
      throw new Error(`El ${role} no es registrado en la BD`);
    }
  }
};

const existEmail = async (email = '') => {
  const existE = await User.findOne({ email });

  if (existE) {
    throw new Error(`El email: ${email} ya existe`);
  }
};

const existUserByID = async (id) => {
  const existId = await User.findById(id);

  if (!existId) {
    throw new Error(`El id: ${id} no existe`);
  }
};

const existCategoryBySlug = async (slug) => {
  /*
  este if() es para validar si se manda la categoria,
  esto es para que encaso de actualizar un producto, 
  pero no querer actualizarla categoria, utilizar esta misma funcion 
  */
  console.log(slug);
  if (slug) {
    const existCategory = await Category.findOne({ slug });
    if (!existCategory) {
      throw new Error(`La categoria: ${slug} no existe`);
    }
  }
};

const existProductBySlug = async (slug) => {
  const existProduct = await Product.findOne({ slug });
  if (!existProduct) {
    throw new Error(`El producto: ${slug} no existe`);
  }
};

module.exports = {
  isValidRole,
  existEmail,
  existUserByID,
  existCategoryBySlug,
  existProductBySlug,
};
