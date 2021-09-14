const express = require('express');
const userController = require('../controllers/UserController');
const { userValidator } = require('../middlewares');
const router = express.Router();
router.get('/fake-data', userController.fakeData);
/* CRUD */
router.post('/:id', userController.update);
router.get('/:id', userController.show);
router.delete('/:id', userValidator.validateIdUser, userController.delete);  
router.post('/', userValidator.validateCreateUser ,userController.create);
router.get('/', userController.index);

module.exports = router;
