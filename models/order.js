const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    required: [true, 'La fecha es obligatoria'],
  },
  orderType: {
    type: String,
    required: [true, 'El tipo es obligatoria'],
    enum: ['PARA LLEVAR', 'COMER AQUÍ'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio'],
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'Product',
    required: [true, 'El producto es obligatorio'],
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
  },
  amount: {
    type: Number,
    default: 0,
  },
});

OrderSchema.methods.toJSON = function () {
  const { __v, state, ...order } = this.toObject();
  return order;
};

const Order = model('Order', OrderSchema);

module.exports = Order;
