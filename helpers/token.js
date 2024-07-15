const jwt = require("jsonwebtoken");

exports.jwtToken = (userId, expiredTime) => {
  return jwt.sign(userId, process.env.SECRET_TOKEN, {
    expiresIn: expiredTime,
  });
};
