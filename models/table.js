const { Schema, model } = require('mongoose');

const TableSchema = new Schema({
  table: {
    type: Number,
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

TableSchema.methods.toJSON = function () {
  const { __v, state, ...table } = this.toObject();
  return table;
};

const Table = model('Table', TableSchema);

module.exports = Table;
