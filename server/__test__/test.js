// seeders/YYYYMMDDHHMMSS-seed-data.js
"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const {
  test,
  expect,
  beforeAll,
  afterAll,
  describe,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { User, sequelize } = require("../models");
const fs = require("fs");
const { signToken } = require("../helpers/jwt");

// Hardcoded recipes data - kept from your original file
const RECIPES_SEEDS = [
  {
    spoonacular_id: 716429,
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    image_url: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    servings: 2,
    ready_in_minutes: 45,
    health_score: 94,
    summary:
      "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be just the main course you are searching for. This recipe makes 2 servings with 636 calories, 21g of protein, and 20g of fat each.",
    instructions:
      "Cook the pasta in a large pot of boiling salted water until al dente. Drain and set aside.\nMeanwhile, bring a large pot of salted water to a boil. Add the cauliflower and cook until tender, about 5 minutes. Drain and set aside.\nHeat the olive oil in a large skillet over medium heat. Add the garlic and scallions and cook until fragrant, about 1 minute. Add the cauliflower and cook until golden, about 5 minutes. Add the breadcrumbs and cook until toasted, about 2 minutes. Season with salt and pepper.\nAdd the pasta to the skillet and toss to combine. Serve warm.",
    vegetarian: true,
    vegan: false,
    gluten_free: false,
    dairy_free: true,
    very_healthy: true,
    cheap: false,
    cooking_minutes: 30,
    preparation_minutes: 15,
    dish_types: JSON.stringify(["lunch", "main course", "main dish", "dinner"]),
    ingredients: JSON.stringify([
      "pasta",
      "garlic",
      "scallions",
      "cauliflower",
      "breadcrumbs",
      "olive oil",
    ]),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    spoonacular_id: 715538,
    title: "Spicy Black Bean Burger",
    image_url: "https://spoonacular.com/recipeImages/715538-556x370.jpg",
    servings: 4,
    ready_in_minutes: 40,
    health_score: 89,
    summary:
      "Spicy Black Bean Burger is a vegetarian main course. One serving contains 440 calories, 21g of protein, and 15g of fat.",
    instructions:
      "In a food processor, combine the black beans, onion, garlic, jalapeño, and spices. Pulse until well combined but still slightly chunky.\nTransfer to a bowl and stir in the breadcrumbs, egg, and cilantro. Form into 4 patties.\nHeat oil in a skillet over medium heat. Cook the patties until browned and heated through, about 5 minutes per side.\nServe on buns with your favorite toppings.",
    vegetarian: true,
    vegan: false,
    gluten_free: false,
    dairy_free: true,
    very_healthy: true,
    cheap: true,
    cooking_minutes: 20,
    preparation_minutes: 20,
    dish_types: JSON.stringify(["lunch", "main course", "main dish", "dinner"]),
    ingredients: JSON.stringify([
      "black beans",
      "onion",
      "garlic",
      "jalapeño",
      "cumin",
      "breadcrumbs",
      "egg",
      "cilantro",
    ]),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    spoonacular_id: 715573,
    title: "Simple Skillet Lasagna",
    image_url: "https://spoonacular.com/recipeImages/715573-556x370.jpg",
    servings: 6,
    ready_in_minutes: 35,
    health_score: 54,
    summary:
      "If you want to add more Mediterranean recipes to your collection, Simple Skillet Lasagna might be a recipe you should try. This recipe serves 6 and costs $2.09 per serving.",
    instructions:
      "Heat olive oil in a large skillet over medium heat. Add the ground beef and cook until browned. Add the onion and garlic and cook until softened.\nStir in the crushed tomatoes, Italian seasoning, salt, and pepper. Bring to a simmer.\nAdd the broken lasagna noodles and water. Cover and cook, stirring occasionally, until the noodles are tender, about 20 minutes.\nStir in the ricotta and sprinkle with mozzarella. Cover and cook until the cheese is melted.",
    vegetarian: false,
    vegan: false,
    gluten_free: false,
    dairy_free: false,
    very_healthy: false,
    cheap: true,
    cooking_minutes: 25,
    preparation_minutes: 10,
    dish_types: JSON.stringify(["lunch", "main course", "main dish", "dinner"]),
    ingredients: JSON.stringify([
      "ground beef",
      "onion",
      "garlic",
      "crushed tomatoes",
      "Italian seasoning",
      "lasagna noodles",
      "ricotta cheese",
      "mozzarella cheese",
    ]),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    spoonacular_id: 632269,
    title: "Amaranth and Roast Vegetable Salad",
    image_url: "https://spoonacular.com/recipeImages/632269-556x370.jpg",
    servings: 4,
    ready_in_minutes: 45,
    health_score: 100,
    summary:
      "Amaranth and Roast Vegetable Salad is a gluten free and vegan side dish. One serving contains 331 calories, 9g of protein, and 16g of fat.",
    instructions:
      "Cook amaranth according to package directions, about 20 minutes.\nPreheat oven to 425°F. Toss vegetables with olive oil, salt, and pepper. Spread on a baking sheet and roast until tender, about 25 minutes.\nIn a small bowl, whisk together lemon juice, olive oil, and herbs for the dressing.\nCombine cooked amaranth and roasted vegetables in a large bowl. Drizzle with dressing and toss to combine. Serve warm or at room temperature.",
    vegetarian: true,
    vegan: true,
    gluten_free: true,
    dairy_free: true,
    very_healthy: true,
    cheap: false,
    cooking_minutes: 25,
    preparation_minutes: 20,
    dish_types: JSON.stringify(["side dish", "salad"]),
    ingredients: JSON.stringify([
      "amaranth",
      "bell peppers",
      "zucchini",
      "carrots",
      "olive oil",
      "lemon juice",
      "herbs",
    ]),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    spoonacular_id: 632252,
    title: "Alouette® Stuffed Mushroom Caps",
    image_url: "https://spoonacular.com/recipeImages/632252-556x370.jpg",
    servings: 8,
    ready_in_minutes: 30,
    health_score: 52,
    summary:
      "Alouette® Stuffed Mushroom Caps is a side dish that serves 8. One serving contains 153 calories, 5g of protein, and 12g of fat.",
    instructions:
      "Preheat oven to 375°F.\nRemove stems from mushrooms and chop fine.\nIn a skillet, sauté chopped stems and garlic in butter until tender.\nIn a bowl, combine Alouette® Garlic & Herbs Spreadable Cheese and sautéed mushroom mixture. Mix well.\nFill mushroom caps with cheese mixture.\nPlace on baking sheet and bake for 15-20 minutes until mushrooms are tender and filling is hot and bubbly.",
    vegetarian: true,
    vegan: false,
    gluten_free: true,
    dairy_free: false,
    very_healthy: false,
    cheap: false,
    cooking_minutes: 20,
    preparation_minutes: 10,
    dish_types: JSON.stringify(["side dish", "appetizer"]),
    ingredients: JSON.stringify([
      "mushrooms",
      "garlic",
      "butter",
      "spreadable cheese",
      "parsley",
    ]),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Sample user data
const USER_SEEDS = [
  {
    username: "rian",
    email: "rian@gmail.com",
    password: "password123",
    height: 175.5,
    weight: 70.2,
    age: 28,
    gender: "male",
    activity_level: "moderate",
    diet: "vegetarian",
    allergies: ["dairy", "peanut"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: "janedoe",
    email: "jane@example.com",
    password: "password456",
    height: 165.0,
    weight: 58.5,
    age: 32,
    gender: "female",
    activity_level: "high",
    diet: "gluten free",
    allergies: ["gluten", "wheat"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: "samsmith",
    email: "sam@example.com",
    password: "password789",
    height: 182.3,
    weight: 81.6,
    age: 35,
    gender: "male",
    activity_level: "light",
    diet: "vegan",
    allergies: ["soy", "tree nut"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Sample user saved recipes
const USER_SAVED_RECIPES_SEEDS = [
  {
    UserId: 1, // This will be replaced by actual IDs after seeding
    RecipeId: 1, // This will be replaced by actual IDs after seeding
    is_favorite: true,
    notes: "Love this pasta dish!",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    UserId: 1,
    RecipeId: 2,
    is_favorite: false,
    notes: "Good vegetarian option for lunch",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    UserId: 2,
    RecipeId: 4,
    is_favorite: true,
    notes: "Perfect for my gluten-free diet",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    UserId: 3,
    RecipeId: 4,
    is_favorite: true,
    notes: "Great vegan salad option",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    UserId: 2,
    RecipeId: 5,
    is_favorite: false,
    notes: "Need to try with different cheese",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let access_token;

beforeAll(async () => {
  // Step 1: Seed users
  const processedUsers = await Promise.all(
    USER_SEEDS.map(async (user) => {
      const hashedPassword = hashPassword(user.password);
      return {
        ...user,
        password: hashedPassword,
      };
    })
  );

  await sequelize.queryInterface.bulkInsert("Users", processedUsers);
  console.log("Users seeded successfully");

  // Step 2: Seed recipes
  await sequelize.queryInterface.bulkInsert("Recipes", RECIPES_SEEDS);
  console.log("Recipes seeded successfully");

  // Step 5: Seed UserSavedRecipes
  await sequelize.queryInterface.bulkInsert(
    "UserSavedRecipes",
    USER_SAVED_RECIPES_SEEDS
  );

  const user = await User.findOne({
    where: {
      email: "rian@gmail.com",
    },
  });
  access_token = signToken({ id: user.id });
  //   console.log(admin);

  console.log("UserSavedRecipes seeded successfully");

  console.log("All data seeded successfully!");
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Recipes", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("UserSavedRecipes", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /login", () => {
  test("login success and get access_token", async () => {
    const response = await request(app).post("/login").send({
      email: "rian@gmail.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
  test("login failed with wrong password", async () => {
    const response = await request(app).post("/login").send({
      email: "rian@gmail.com",
      password: "wrongpassword",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });
  test("login failed with wrong email", async () => {
    const response = await request(app).post("/login").send({
      email: "wrongemail@gmail.com",
      password: "password123",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });
  test("login failed with empty email", async () => {
    const response = await request(app).post("/login").send({
      email: "",
      password: "password123",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
  test("login failed with empty password", async () => {
    const response = await request(app).post("/login").send({
      email: "rian@gmail.com",
      password: "",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });
  test("email not found", async () => {
    const response = await request(app).post("/login").send({
      email: "nonexistent@gmail.com",
      password: "password123",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });
});
describe("POST /register", () => {
  test("register success", async () => {
    const response = await request(app).post("/register").send({
      username: "testuser",
      email: "testuser@gmail.com",
      password: "password123",
    });

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("username", "testuser");
    expect(response.body).toHaveProperty("email", "testuser@gmail.com");
  });
  test("register failed with empty username", async () => {
    const response = await request(app).post("/register").send({
      username: "",
      email: "testuser@gmail.com",
      password: "password123",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Username cannot be empty");
  });
  test("register failed with empty email", async () => {
    const response = await request(app).post("/register").send({
      username: "testuser",
      email: "",
      password: "password123",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email cannot be empty");
  });
  test("register failed with empty password", async () => {
    const response = await request(app).post("/register").send({
      username: "testuser",
      email: "testuser@gmail.com",
      password: "",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password cannot be empty");
  });
  test("register failed with invalid email", async () => {
    const response = await request(app).post("/register").send({
      username: "testuser",
      email: "invalidemail",
      password: "password123",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid email format");
  });
  test("register failed with existing email", async () => {
    const response = await request(app).post("/register").send({
      username: "testuser",
      email: "rian@gmail.com",
      password: "password123",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email must be unique");
  });
});
describe("PUT /profile", () => {
  test("update Profile Success", async () => {
    const newProfile = {
      gender: "male",
      weight: 70,
      height: 170,
      age: 25,
      activity_level: "moderate",
      diet: "vegetarian",
      allergies: [],
    };
    const response = await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${access_token}`)
      .send(newProfile);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Profile updated successfully"
    );
  });
  test("update Profile failed with invalid token", async () => {
    const newProfile = {
      gender: "male",
      weight: 70,
      height: 170,
      age: 25,
      activityLevel: "moderate",
    };
    const response = await request(app)
      .put("/profile")
      .set("Authorization", `Bearer invalidtoken`)
      .send(newProfile);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
  test("update Profile failed with invalid profile data", async () => {
    const newProfile = {
      gender: "male",
      weight: "invalid",
      height: 170,
      age: 25,
      activityLevel: "moderate",
    };
    const response = await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${access_token}`)
      .send(newProfile);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Weight must be a positive number"
    );
  });
  test("update Profile failed with invalid gender", async () => {
    const newProfile = {
      gender: "invalid",
      weight: 70,
      height: 170,
      age: 25,
      activityLevel: "moderate",
    };
    const response = await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${access_token}`)
      .send(newProfile);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Gender must be either 'male' or 'female'"
    );
  });
  test("age is empty", async () => {
    const newProfile = {
      gender: "male",
      weight: 70,
      height: 170,
      activityLevel: "moderate",
    };
    const response = await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${access_token}`)
      .send(newProfile);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Age is required");
  });
});
describe("GET /profile", () => {
  test("get Profile Success", async () => {
    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("username", "rian");
    expect(response.body).toHaveProperty("email", "rian@gmail.com");
  });
  test("get Profile failed with invalid token", async () => {
    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer invalidtoken`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
  test("get Profile failed with invalid profile data", async () => {
    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer invalidtoken`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});
describe("GET /my-recipes", () => {
  describe("User Saved Recipe Endpoints", () => {
    test("Get all saved recipes", async () => {
      const response = await request(app)
        .get("/my-recipes")
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
    test("Get specific saved recipe", async () => {
      const savedRecipeId = 1;
      const response = await request(app)
        .get(`/my-recipes/${savedRecipeId}`)
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", savedRecipeId);
      expect(response.body).toBeInstanceOf(Object);
    });
    test("Update recipe notes", async () => {
      const savedRecipeId = 1;
      const notes = "Test notes for the recipe";
      const response = await request(app)
        .put(`/my-recipes/note/${savedRecipeId}`)
        .set("Authorization", `Bearer ${access_token}`)
        .send({ notes });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("notes", notes);
    });
    test("Delete a saved recipe", async () => {
      const savedRecipeId = 1;
      const response = await request(app)
        .delete(`/my-recipes/delete/${savedRecipeId}`)
        .set("Authorization", `Bearer ${access_token}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Recipe removed from saved recipes"
      );
      const checkResponse = await request(app)
        .get(`/my-recipes/${savedRecipeId}`)
        .set("Authorization", `Bearer ${access_token}`);
      expect(checkResponse.status).toBe(404);
    });
  });
});
describe("GET /recipes", () => {
  test("Get all recipes", async () => {
    const response = await request(app)
      .get("/recipes")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  test("Get specific recipe", async () => {
    const recipeId = 1;
    const response = await request(app)
      .get(`/recipes/server/${recipeId}`)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", recipeId);
    expect(response.body).toBeInstanceOf(Object);
  });
  test("getMostRecentRecipes", async () => {
    const response = await request(app)
      .get("/recipes/mostRecent")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
