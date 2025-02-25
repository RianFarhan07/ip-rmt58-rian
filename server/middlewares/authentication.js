const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const token = bearerToken.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const data = verifyToken(token);
    const user = await User.findByPk(data.id);

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).send({ message: "Internal server error" });
    }
  }
}

module.exports = authentication;
