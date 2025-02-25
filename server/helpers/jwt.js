const jwt = require("jsonwebtoken");

const signToken = (data) => jwt.sign(data, "rahasia");
const verifyToken = (token) => jwt.verify(token, "rahasia");

module.exports = {
  signToken,
  verifyToken,
};
