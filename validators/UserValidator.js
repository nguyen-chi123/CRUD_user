const { checkSchema } = require('express-validator');
const _ = require('lodash');

const createUsersSchema = {
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
}

const validateCreateUser = checkSchema(createUsersSchema);

const validateUpdateUser = checkSchema({
  id: {
    in: 'params',
    notEmpty: true,
    isNumeric: true,
    toInt: true,
  },
  ..._.omit(createUsersSchema, ['id'])
})

module.exports = {
  validateCreateUser,
  validateUpdateUser
}