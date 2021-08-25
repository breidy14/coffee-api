const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'El rol es obligatorio'],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

RoleSchema.methods.toJSON = function () {
  const { __v, state, ...role } = this.toObject();
  return role;
};

const Role = model('Role', RoleSchema);

module.exports = Role;
