const {check} = require('express-validator');

let validateRegisterUser = () => {
  return [ 
    check('id').notEmpty(),
    check('username').isAlphanumeric().isLength({ min: 8 }),
    check('password', 'mật khâu tối thiểu 8 ký tự').isLength({ min: 8 }), 
    check('email').notEmpty().isEmail(),
    check('birthday').isISO8601('yyyy-mm-dd'),
    // check('gender').isLength({ min: 6 })
  ]; 
}


let validate = {
  validateRegisterUser: validateRegisterUser,
 
};

module.exports = {validate};