"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Recipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      spoonacular_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      servings: {
        type: Sequelize.INTEGER,
      },
      ready_in_minutes: {
        type: Sequelize.INTEGER,
      },
      health_score: {
        type: Sequelize.FLOAT,
      },
      summary: {
        type: Sequelize.TEXT,
      },
      instructions: {
        type: Sequelize.TEXT,
      },
      vegetarian: {
        type: Sequelize.BOOLEAN,
      },
      vegan: {
        type: Sequelize.BOOLEAN,
      },
      gluten_free: {
        type: Sequelize.BOOLEAN,
      },
      dairy_free: {
        type: Sequelize.BOOLEAN,
      },
      very_healthy: {
        type: Sequelize.BOOLEAN,
      },
      cheap: {
        type: Sequelize.BOOLEAN,
      },
      cooking_minutes: {
        type: Sequelize.INTEGER,
      },
      preparation_minutes: {
        type: Sequelize.INTEGER,
      },
      dish_types: {
        type: Sequelize.TEXT,
      },
      ingredients: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Recipes");
  },
};
