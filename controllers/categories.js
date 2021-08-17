const { request, response } = require('express'); //es o es nesesario, pero es para obtener el tipado y las ayudas

const { Category } = require('../models');

//obtener cateorias - paginado - total - populate
const getCategories = async (req = request, res = response) => {
  let { limit = 5, desde = 0 } = req.query;

  if (isNaN(limit) === true) {
    limit = 5;
  }
  if (isNaN(desde) === true) {
    desde = 1;
  }
  try {
    const categories = Category.find({ state: true })
      .skip(Number(desde))
      .limit(Number(limit))
      .populate('user', 'name');
    const total = Category.countDocuments({ state: true });

    const [resTotal, resCategories] = await Promise.all([total, categories]);

    res.status(200).json({
      resTotal,
      resCategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

//obtener categoria
const getCategory = async (req = request, res = response) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({ slug }).populate('user', 'name');

    if (!category.state) {
      return res.status(400).json({
        msg: `La categoria: ${category.name}, no esta activa. Hable con el admin`,
      });
    }

    res.status(200).json({
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

//crear
const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  try {
    //verificando si hay una categoria con ese nombre
    const categoryDB = await Category.findOne({ name });
    if (categoryDB) {
      return res.status(400).json({
        msg: `La categoria ${name}, ya ha sido creada`,
      });
    }

    const data = {
      name,
      user: req.userAuth._id,
    };

    const category = new Category(data);

    await category.save();

    res.status(201).json({
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

//actualizar
const updateCategory = async (req = request, res = response) => {
  res.status(200).json({
    msg: 'OK',
  });
};

//eliminat, - state: false
const deleteCategory = async (req = request, res = response) => {
  res.status(200).json({
    msg: 'OK',
  });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
