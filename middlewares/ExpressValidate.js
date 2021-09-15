const { check, validationResult, checkSchema } = require('express-validator');
const { options } = require('../routes/users');

let checkValidator = [
    check('id').notEmpty().isNumeric(),
    check('username').notEmpty().trim()
        .matches(/[A-Za-z0-9_]+/)
        .withMessage('tên người dùng là chữ hoa, chữ thường, chữ số và dấu _'),
    check('password').notEmpty()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .withMessage('mật khẩu phải chứa ít nhất 8 ký tự, ít nhất 1 chữ số'),
    check('email').notEmpty().isEmail().withMessage('email không hợp lệ'),
    check('birthday').isDate(),
    check('gender').isIn(['male', 'female', 'unknown']),
    check('address').isString(),
    check('phone').isString(),
];

let validateSchema = checkSchema({
    id: {
        notEmpty: true, 
        isNumeric: true,
        toInt: true,
    },
    username: {
        trim: true,
        isLength: {
            errorMessage: 'username tối thiểu 6 ký tự',
            options: {min: 6}
        },
        matches: /[A-Za-z0-9_]+/,
        errorMessage: 'tên người dùng là chữ hoa, chữ thường, chữ số và dấu _'
    }, 
    password: {
        matches: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        errorMessage: 'mật khẩu phải chứa ít nhất 8 ký tự, ít nhất 1 chữ số'
    }, 
    email: {
        isEmail: true,
        errorMessage: 'email không hợp lệ',
    }, 
    birthday: {
        isString: true,
        isDate: {
            options: {
                format: 'YYYY-MM-DD', 
            }
        }
    }, 
    gender: {
        isIn: (['male', 'female', 'unknown']), 
        errorMessage: 'giới tính là male hoặc female hoặc unknown'
    }, 
    address: {
        isString: true,
    }, 
    phone: {
        isString: true,
    }
})

// check error use validationResult
let validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json(errors.array());
        return;
    }
    next();
}

let expressValidate = {
    checkValidator: checkValidator, 
    validateResult: validateResult,
    validateSchema: validateSchema,
}


module.exports = { expressValidate };