const { Schema, model } = require('mongoose');
const slugify = require('../plugins/slugify');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
});

ProductSchema.pre('save', function (next) {
  if (this.slug) return next();

  this.slug = slugify(this.name);
  next();
});

ProductSchema.methods.toJSON = function () {
  const { __v, state, ...product } = this.toObject();
  return product;
};

const Product = model('Product', ProductSchema);

module.exports = Product;
