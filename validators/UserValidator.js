/*
* Thư viện lodash là 1 thư viện rất phổ biến, được sử dụng thường xuyên
* trong javascripts (cả phía backend & frontend). Thư viện có rất nhiều các
* ulitities functions, giúp mình code ngắn hơn
* */
const _ = require('lodash');

class UserValidator {
  validateCreateUsers(params) {
    let {
      id,
      username,
      password,
      email,
      birthday,
      gender,
      address,
      phone
    } = params
    const transformed = {}
    id = parseInt(id)
    if (!_.isInteger(id)) throw new Error(`Giá trị id ${id} cần truyền dưới dạng số.`);
    transformed.id = id

    if (!/[A-Za-z0-9_]+/.test(username))
      throw new Error(`username chỉ được chứa các kí tự chữ hoa, thường, số và dấu '_'`);
    transformed.username = username

    if (!password || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
      throw new Error(`Password cần tối thiếu 8 kí tự. Có ít nhất 1 số.`);
    transformed.password = password

    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      throw new Error(`Email không hợp lệ`);
    transformed.email = email

    /* Chỗ này đang sử dụng hàm trong lodash đây*/
    if (_.includes(['male', 'female', 'unknown'], gender))
      throw new Error(`Giới tính ${gender} không hợp lệ`);
    transformed.gender = gender

    if (!_.isString(address) || !_.isString(phone))
      throw new Error(`Địa chỉ, số điện thoại không hợp lệ`);
    transformed.address = address
    transformed.phone = phone

    return transformed
  }

  validateDeleteUsers(params) {
    /*
    * Hàm xóa chú ý phải validate cẩn thận giá trị id.
    * Thậm trí trong project thực tế còn phải validate user đó có được quyền xóa id đó hay không?
    * Vì nếu ko hacker có thể lợi dụng NoSQl Injection để xóa toàn bộ bảng users luôn
    * */
    let {id} = params
    id = parseInt(id)
    if (!_.isInteger(id)) throw new Error(`Giá trị id ${id} cần truyền dưới dạng số.`);
    return {id}
  }
}

module.exports = new UserValidator();
