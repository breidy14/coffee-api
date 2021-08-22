const { response, request } = require('express');
const { Category } = require('../models');
const {
  searchUsers,
  searchCategories,
  searchProducts,
  searchProductsByCategory,
} = require('../helpers');

const validColection = ['categories', 'products', 'users'];

const search = async (req = request, res = response) => {
  const { colection, term } = req.params;

  if (!validColection.includes(colection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${validColection}`,
    });
  }

  switch (colection) {
    case 'categories':
      const categories = await searchCategories(term);

      res.status(200).json({ results: categories });
      break;
    case 'products':
      const products = await searchProducts(term);

      res.status(200).json({ results: products });
      break;
    case 'users':
      const users = await searchUsers(term);

      res.status(200).json({ results: users });
      break;

    default:
      res.status(500).json({
        msg: 'Algo salio mal, esta búsqueda aun no esta, habla con el admin',
      });
      break;
  }
};

const searchProductsCategory = async (req = request, res = response) => {
  const { categorySlug, term } = req.params;

  //buscar id de la categoria
  const { _id: idCategory } = await Category.findOne(
    { slug: categorySlug },
    '_id'
  );

  const results = await searchProductsByCategory(idCategory, term);

  res.status(200).json({ results });
};

module.exports = {
  search,
  searchProductsCategory,
};
