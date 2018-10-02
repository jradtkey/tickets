const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "this_is_a_secret_code_that_i_need_to_add");
    next();
  } catch (error) {
    res.status(401).json({ message: "Login Failed in the token"})
  }


};
