const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/fake-data', UserController.fakeData);
/* CRUD */
router.post('/:id', userController.update);
router.get('/:id', userController.show);
router.delete('/:id', userController.delete);  
router.post('/', userController.create);
router.get('/', userController.index);

module.exports = router;
