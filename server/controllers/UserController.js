const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const newUser = await User.create({
        username,
        email,
        password,
      });

      const result = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      };

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.errors[0].message });
      } else if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: "Email must be unique" });
      } else {
        res.status(500).send({ message: "Internal server error" });
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const accessToken = signToken({ id: user.id });

      res.json({ access_token: accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { height, weight, age, gender, activity_level } = req.body;
      const id = req.user.id;

      if (height === undefined || height === null) {
        return res.status(400).json({ message: "Height is required" });
      }
      if (isNaN(height) || height <= 0) {
        return res
          .status(400)
          .json({ message: "Height must be a positive number" });
      }

      if (weight === undefined || weight === null) {
        return res.status(400).json({ message: "Weight is required" });
      }
      if (isNaN(weight) || weight <= 0) {
        return res
          .status(400)
          .json({ message: "Weight must be a positive number" });
      }

      if (age === undefined || age === null) {
        return res.status(400).json({ message: "Age is required" });
      }
      if (isNaN(age) || age <= 0) {
        return res
          .status(400)
          .json({ message: "Age must be a valid integer greater than 0" });
      }

      const allowedGenders = ["male", "female"];
      if (!gender || !allowedGenders.includes(gender)) {
        return res
          .status(400)
          .json({ message: "Gender must be either 'male' or 'female'" });
      }

      const allowedActivityLevels = [
        "low",
        "light",
        "moderate",
        "high",
        "very_high",
      ];
      if (!activity_level && !allowedActivityLevels.includes(activity_level)) {
        return res.status(400).json({
          message:
            "activity level must be either 'low', 'light', 'moderate', 'high', or 'very_high'",
        });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.update({
        height,
        weight,
        age,
        gender,
        activity_level,
      });

      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error(error);
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = UserController;
