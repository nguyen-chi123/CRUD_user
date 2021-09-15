const _ = require('lodash');
const { check, checkSchema } = require('express-validator');
class UserValidator {
    validateCreateUser(req, res, next) {
        let {
            id,
            username,
            password,
            email,
            birthday,
            gender,
            address,
            phone
        } = req.body

        id = parseInt(id);
        if (!_.isInteger(id)) throw new Error(`Giá trị id ${id} cần truyền dưới dạng số.`);
        if (!/[A-Za-z0-9_]+/.test(username))
            return res.status(400).json({
                success: false,
                mess: `username chỉ được chứa các kí tự chữ hoa, thường, số và dấu '_'`
            });

        if (!password || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
            return res.status(400).json({
                success: false,
                mess: `password tối thiểu 8 ký tự, chứa ít nhất một số`
            });
        if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            return res.status(400).json({
                success: false,
                mess: `email không hợp lệ`
            });

        /* Chỗ này đang sử dụng hàm trong lodash đây*/
        if (_.includes(['male', 'female', 'unknown'], gender))
            return res.status(400).json({
                success: false,
                mess: `Giới tính ${gender} không hợp lệ`
            });

        if (!_.isString(address) || !_.isString(phone)) //`Địa chỉ, số điện thoại không hợp lệ`
            return res.status(400).json({
                success: false,
                mess: `Địa chỉ, số điện thoại không hợp lệ`
            });

        next();
    }

    validateIdUser(req, res, next) {
        return [
            check(req.params.id).isNumeric(),
            next()
        ];
    }

}

module.exports = new UserValidator();
