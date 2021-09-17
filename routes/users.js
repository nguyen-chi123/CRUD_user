const express = require('express');
const userController = require('../controllers/UserController');
const { userValidator, expressValidate } = require('../middlewares');
const router = express.Router();

router.get('/fake-data', userController.fakeData);
/* CRUD */
router.put('/:id', userValidator.validateCreateUser, userController.update);
router.get('/:id', userController.show);
router.delete('/:id', userValidator.validateIdUser, userController.delete);  
// router.post('/', 
//     expressValidate.checkValidator,
//     expressValidate.validateResult,
//     userController.create);
router.post('/', 
    expressValidate.validateSchema,
    expressValidate.validateResult,
    userController.create);
router.get('/', userController.index);


module.exports = router;

