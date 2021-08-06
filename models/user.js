const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//funcion normal, porque usaremos this
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

const User = model('User', UserSchema);

module.exports = User;
