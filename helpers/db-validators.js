const { User, Role, Category } = require('../models');

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
    throw new Error(`El ${email} ya existe`);
  }
};

const existUserByID = async (id) => {
  const existId = await User.findById(id);

  if (!existId) {
    throw new Error(`El ${id} no existe`);
  }
};

const existCategoryBySlug = async (slug) => {
  const existCategory = await Category.findOne({ slug });
  if (!existCategory) {
    throw new Error(`La ${slug} no existe`);
  }
};

module.exports = {
  isValidRole,
  existEmail,
  existUserByID,
  existCategoryBySlug,
};
