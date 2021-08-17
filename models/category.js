const { Schema, model } = require('mongoose');
const slugify = require('../plugins/slugify');

const CategorySchema = Schema({
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
});

CategorySchema.pre('save', function () {
  if (this.slug) return next();

  this.slug = slugify(this.name);
});

CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  category.uid = _id;
  return category;
};

const Category = model('Category', CategorySchema, 'categories');

module.exports = Category;
