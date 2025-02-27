const { sign } = require("jsonwebtoken");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

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

  static async getProfile(req, res) {
    try {
      const id = req.user.id;

      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { height, weight, age, gender, activity_level, diet, allergies } =
        req.body;
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
      if (!activity_level || !allowedActivityLevels.includes(activity_level)) {
        return res.status(400).json({
          message:
            "Activity level must be either 'low', 'light', 'moderate', 'high', or 'very_high'",
        });
      }

      // Validate diet if provided
      if (diet) {
        const allowedDiets = [
          "gluten free",
          "ketogenic",
          "vegetarian",
          "lacto-vegetarian",
          "ovo-vegetarian",
          "vegan",
          "pescetarian",
          "paleo",
          "primal",
          "low fodmap",
          "whole30",
        ];
        if (!allowedDiets.includes(diet)) {
          return res.status(400).json({ message: "Invalid diet type" });
        }
      }

      // Validate allergies if provided
      if (allergies) {
        if (!Array.isArray(allergies)) {
          return res
            .status(400)
            .json({ message: "Allergies must be an array" });
        }

        const allowedAllergies = [
          "dairy",
          "egg",
          "gluten",
          "grain",
          "peanut",
          "seafood",
          "sesame",
          "shellfish",
          "soy",
          "sulfite",
          "tree nut",
          "wheat",
        ];

        for (const allergy of allergies) {
          if (!allowedAllergies.includes(allergy)) {
            return res
              .status(400)
              .json({ message: `Invalid allergy type: ${allergy}` });
          }
        }
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
        diet,
        allergies,
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
  static async googleLogin(req, res) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the WEB_CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      let user = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        user = await User.create(
          {
            username: payload.name,
            email: payload.email,
            password: "google",
          },
          {
            hooks: false,
          }
        );
      }

      const accessToken = signToken({ id: user.id });

      res.json({ message: "LoginSuccess", access_token: accessToken });
      console.log(payload);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
