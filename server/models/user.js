"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserSavedRecipe, {
        foreignKey: "UserId",
      });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Username cannot be null" },
          notEmpty: { msg: "Username cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email is already taken",
        },
        validate: {
          isEmail: { msg: "Invalid email format" },
          notNull: { msg: "Email cannot be null" },
          notEmpty: { msg: "Email cannot be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password cannot be null" },
          notEmpty: { msg: "Password cannot be empty" },
          len: {
            args: [6, 100],
            msg: "Password must be at least 6 characters long",
          },
        },
      },
      height: {
        type: DataTypes.FLOAT,
        validate: {
          isFloat: { msg: "Height must be a valid number" },
          min: {
            args: [0.1],
            msg: "Height must be greater than 0",
          },
        },
      },
      weight: {
        type: DataTypes.FLOAT,
        validate: {
          isFloat: { msg: "Weight must be a valid number" },
          min: {
            args: [0.1],
            msg: "Weight must be greater than 0",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: "Age must be a valid integer" },
          min: {
            args: [1],
            msg: "Age must be at least 1 year",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["male", "female"]],
            msg: "Gender must be either 'male' or 'female'",
          },
        },
      },
      activity_level: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["low", "light", "moderate", "high", "very_high"]],
            msg: "Activity level must be either 'low', 'light', 'moderate', 'high', or 'very_high'",
          },
        },
      },
      diet: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [
              [
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
              ],
            ],
            msg: "Invalid diet type",
          },
        },
      },
      allergies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        validate: {
          isValidAllergies(value) {
            if (!Array.isArray(value)) {
              throw new Error("Allergies must be an array");
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

            for (const allergy of value) {
              if (!allowedAllergies.includes(allergy)) {
                throw new Error(`Invalid allergy type: ${allergy}`);
              }
            }
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
