const { request, response } = require('express');

const { Role, User } = require('../models');

const getRoles = async (req = request, res = response) => {
  try {
    const roles = Role.find({ state: true });
    const total = Role.countDocuments({ state: true });

    const [resTotal, resRole] = await Promise.all([total, roles]);

    res.status(200).json({
      resTotal,
      resRole,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

const createRole = async (req = request, res = response) => {
  const { role } = req.body;

  try {
    //verificando si hay un role con ese nombre
    const roleDB = await Role.findOne({ role });
    if (roleDB) {
      return res.status(400).json({
        msg: `El rol: ${role}, ya ha sido creada`,
      });
    }
    const data = {
      role: role.toUpperCase(),
    };
    const roleN = new Role(data);
    await roleN.save();

    res.status(201).json({
      role: roleN,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

const addUserRole = async (req = request, res = response) => {
  const { userId } = req.body;
  const { id } = req.params;

  const { role } = Role.findById(id, 'role');

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    {
      new: true,
    }
  );

  res.status(200).json({
    user,
  });
};

const deleteRole = async (req = request, res = response) => {
  const { id } = req.params;

  const role = await Role.findByIdAndUpdate(
    id,
    { state: false },
    {
      new: true,
    }
  );

  res.status(200).json({
    role,
  });
};

module.exports = {
  getRoles,
  createRole,
  addUserRole,
  deleteRole,
};
