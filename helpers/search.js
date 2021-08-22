const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const searchCategories = async (term = '') => {
  const isMongoID = ObjectId.isValid(term); //boolean
  if (isMongoID) {
    const category = await Category.findById(term);
    const results = category ? [category] : [];
    return results;
  }

  const regex = new RegExp(term, 'i');

  const categories = await Category.find({
    $or: [{ name: regex }, { slug: regex }],
    $and: [{ state: true }],
  });

  return categories;
};

const searchProducts = async (term = '') => {
  const isMongoID = ObjectId.isValid(term); //boolean
  if (isMongoID) {
    const product = await Product.findById(term).populate('category', 'name');
    const results = product ? [product] : [];
    return results;
  }

  const regex = new RegExp(term, 'i');

  const products = await Product.find({
    $or: [{ name: regex }, { slug: regex }, { description: regex }],
    $and: [{ state: true }],
  }).populate('category', 'name');

  return products;
};

const searchUsers = async (term = '') => {
  const isMongoID = ObjectId.isValid(term); //boolean
  if (isMongoID) {
    const user = await User.findById(term);
    const results = user ? [user] : [];
    return results;
  }

  const regex = new RegExp(term, 'i');

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  return users;
};

//obtener productos por categoria
const searchProductsByCategory = async (category = '', term = '') => {
  //encaso de no venir termino, regresar todos los productos con la categoria encontrada
  if (!term) {
    const results = await Product.find({ category }).populate(
      'category',
      'name'
    );
    return results;
  }

  const regex = new RegExp(term, 'i');

  const products = await Product.find({
    $or: [{ name: regex }, { slug: regex }, { description: regex }],
    $and: [{ state: true }, { category }],
  }).populate('category', 'name');

  return products;
};

module.exports = {
  searchCategories,
  searchProducts,
  searchUsers,
  searchProductsByCategory,
};
