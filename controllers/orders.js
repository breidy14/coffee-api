const { request, response } = require('express');

const { Order, User, Table, Product } = require('../models');
const { paramsBuilder } = require('../helpers');

const validParams = ['orderType', 'products'];

const getOrders = async (req = request, res = response) => {
  try {
    const orders = Order.find()
      .populate('user', 'name')
      .populate('products', 'name')
      .populate('table', 'table');
    const total = Order.countDocuments();

    const [resTotal, resOrder] = await Promise.all([total, orders]);

    res.status(200).json({
      resTotal,
      resOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

const getOrder = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id)
      .populate('user', 'name')
      .populate('products', 'name')
      .populate('table', 'table');

    res.status(200).json({
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

const createOrder = async (req = request, res = response) => {
  const data = paramsBuilder(validParams, req.body);
  const { table } = req.body;
  let amount = 0;
  try {
    //id del usuario y fecha
    data.user = req.userAuth._id;
    data.createdAt = Date.now();

    //ver si la mesa enviada esta disponible
    const tableDB = await Table.findOne({ table }, { state: true });
    if (!tableDB || !tableDB.available) {
      return res
        .status(400)
        .json({ msg: `La mesa: ${table}, no esta disponible` });
    }

    //ver si es para llevar o comer en el lugar, en el ultimo caso, entonces se agrega la mesa y se campia su diponibilidad
    data.orderType = data.orderType.toUpperCase();
    if ('COMER AQUÍ' === data.orderType) {
      data.table = tableDB._id;
      tableDB.available = false;
      await tableDB.save();
    }

    //obtener precio de productos y sumarlos al monto total
    const productsPrice = await Product.find({ _id: data.products }, 'price');
    productsPrice.forEach((p) => {
      amount = amount + p.price;
    });
    data.amount = amount;

    //crear orden y guardar en DB
    const order = new Order(data);
    await order.save();

    res.status(201).json({
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

/* const deleteOrder = async (req = request, res = response) => {
  const { id } = req.params;

  const order = await Order.findByIdAndUpdate(id, {
    new: true,
  });

  res.status(200).json({
    order,
  });
}; */

module.exports = {
  getOrders,
  getOrder,
  createOrder,
};
