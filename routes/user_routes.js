const { Router } = require('express');
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.js');

const router = Router();

router.get('/', getUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
