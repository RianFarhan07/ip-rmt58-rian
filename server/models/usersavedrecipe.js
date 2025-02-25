"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserSavedRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSavedRecipe.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      UserSavedRecipe.belongsTo(models.Recipe, {
        foreignKey: "RecipeId",
      });
    }
  }
  UserSavedRecipe.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "user_id cannot be null",
          },
          notEmpty: {
            msg: "user_id cannot be empty",
          },
        },
        references: {
          model: "Users",
          key: "id",
        },
      },
      RecipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "recipe_id cannot be null",
          },
          notEmpty: {
            msg: "recipe_id cannot be empty",
          },
        },
        references: {
          model: "Recipes",
          key: "id",
        },
      },
      is_favorite: DataTypes.BOOLEAN,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserSavedRecipe",
    }
  );
  return UserSavedRecipe;
};
