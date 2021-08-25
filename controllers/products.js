const { request, response } = require('express'); //es o es nesesario, pero es para obtener el tipado y las ayudas

const { Product, Category } = require('../models');
const slugify = require('../plugins/slugify');
const { paramsBuilder, uploadFile } = require('../helpers');
const validParams = ['name', 'description', 'price', 'available', 'category'];

//obtener productos - paginado - total - populate
const getProducts = async (req = request, res = response) => {
  let { limit = 5, desde = 0 } = req.query;

  if (isNaN(limit) === true) {
    limit = 5;
  }
  if (isNaN(desde) === true) {
    desde = 1;
  }
  try {
    const products = Product.find({ state: true })
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(desde))
      .limit(Number(limit));
    const total = Product.countDocuments({ state: true });

    const [resTotal, resproducts] = await Promise.all([total, products]);

    res.status(200).json({
      resTotal,
      resproducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

//obtener product
const getProduct = async (req = request, res = response) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug })
      .populate('user', 'name')
      .populate('category', 'name');

    if (!product.state) {
      return res.status(400).json({
        msg: `El producto: ${product.name}, no esta activo. Hable con el admin`,
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

//crear
const createProduct = async (req = request, res = response) => {
  const data = paramsBuilder(validParams, req.body);

  data.name = data.name.toUpperCase();
  data.user = req.userAuth._id;

  try {
    //verificando si hay un producto con ese nombre
    const productDB = await Product.findOne({ name: data.name });
    if (productDB) {
      return res.status(400).json({
        msg: `El producto: ${data.name}, ya ha sido creado`,
      });
    }
    //buscando id de categoria
    const { _id } = await Category.findOne({ slug: data.category }, '_id');
    data.category = _id;

    const product = new Product(data);

    if (req.files.miFile) {
      const secure_url = await uploadFile(req.files);
      product.img = secure_url;
    }

    await product.save();

    res.status(201).json({
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

//actualizar
const updateProduct = async (req = request, res = response) => {
  const { slug } = req.params;
  const data = paramsBuilder(validParams, req.body);

  //si viene el nombre, actualizar nombre y slug
  if (data.name) {
    data.name = data.name.toUpperCase();
    data.slug = slugify(data.name); // nuevo slug
  }

  data.user = req.userAuth._id;

  try {
    //buscando id de categoria si vino
    if (data.category) {
      const categoryId = await Category.findOne({ slug: data.category }, '_id');
      data.category = categoryId;
    }

    const product = await Product.findOneAndUpdate({ slug }, data, {
      new: true,
    });

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

//eliminat, - state: false
const deleteProduct = async (req = request, res = response) => {
  const { slug } = req.params;

  try {
    const product = await Product.findOneAndUpdate(
      { slug },
      { state: false },
      { new: true }
    );

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
