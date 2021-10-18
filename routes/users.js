const express = require('express');
const userController = require('../controllers/UserController');
const {validateMiddleware} = require('../middlewares');
const {userValidator} = require('../validators');
const router = express.Router();

router.get('/fake-data', userController.fakeData);
/* CRUD */
router.put('/:id',
  userValidator.validateUpdateUser,
  validateMiddleware,
  userController.update);

router.post('/',
  userValidator.validateCreateUser,
  validateMiddleware,
  userController.create);


router.get('/:id', userController.show);

router.delete('/:id', userValidator.validateIdUser, userController.delete);

router.get('/', userController.index);

//// edit

module.exports = router;

