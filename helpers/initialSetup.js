const { Role, User } = require('../models');
const bcrypt = require('bcrypt');

const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.countDocuments();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      Role.create({ role: 'ADMIN_ROLE' }),
      Role.create({ role: 'SALE_ROLE' }),
      Role.create({ role: 'USER_ROLE' }),
    ]);

    console.log('Roles Created!');
  } catch (error) {
    console.error(error);
  }
};

const createAdmin = async () => {
  // check for an existing admin user

  try {
    const count = await User.countDocuments();

    // check for existing users
    if (count > 0) return;

    const emailAdmin = process.env.EMAIL_ADMIN;
    const passwordAdmin = process.env.PASSWORD_ADMIN;

    if (!emailAdmin || !passwordAdmin) {
      throw new Error(
        'DEBE de definir el email y el password del usuario admin en las vaiables de entorno, mirar .env.example'
      );
    }

    // get roles _id
    const { role } = await Role.findOne({ role: 'ADMIN_ROLE' });
    const data = {
      name: 'admin',
      email: emailAdmin,
      role,
    };

    const user = new User(data);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(passwordAdmin, salt);
    await user.save();

    // create a new admin user
    console.log('Admin User Created!');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createAdmin,
  createRoles,
};
