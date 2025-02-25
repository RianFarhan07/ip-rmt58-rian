"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipe.init(
    {
      spoonacular_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "spoonacular_id cannot be null",
          },
          notEmpty: {
            msg: "spoonacular_id cannot be empty",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "title cannot be null",
          },
          notEmpty: {
            msg: "title cannot be empty",
          },
        },
      },
      image_url: DataTypes.STRING,
      servings: DataTypes.INTEGER,
      ready_in_minutes: DataTypes.INTEGER,
      health_score: DataTypes.FLOAT,
      summary: DataTypes.TEXT,
      instructions: DataTypes.TEXT,
      vegetarian: DataTypes.BOOLEAN,
      vegan: DataTypes.BOOLEAN,
      gluten_free: DataTypes.BOOLEAN,
      dairy_free: DataTypes.BOOLEAN,
      very_healthy: DataTypes.BOOLEAN,
      cheap: DataTypes.BOOLEAN,
      cooking_minutes: DataTypes.INTEGER,
      preparation_minutes: DataTypes.INTEGER,
      dish_types: DataTypes.TEXT,
      ingredients: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
