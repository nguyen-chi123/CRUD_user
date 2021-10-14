const {validationResult} = require('express-validator');


// check error use validationResult
const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
    return;
  }
  next();
}


module.exports = {
  validateMiddleware
}