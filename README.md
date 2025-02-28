# RecipePedia API Documentation

## Endpoints:

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login/google`
- `GET /profile`
- `PUT /profile`
- `GET /my-recipes`
- `GET /my-recipes/full-detail/:id`
- `POST /my-recipes/add/:spoonacularId`
- `DELETE /my-recipes/delete/:id`
- `PUT /my-recipes/note/:id`
- `GET /my-recipes/:id`
- `GET /recipes/random`
- `GET /recipes/findByIngredients`
- `GET /recipes/generateByNutrients`
- `GET /recipes/generateIngredientRecommendations`
- `GET /recipes/mostRecent`
- `GET /recipes/categories/:category`
- `GET /recipes/server/:id`
- `GET /recipes/spoonacular/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 9,
  "username": "rian",
  "email": "rian@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Username cannot be null"
}
OR
{
    "message": "Email cannot be null"
}
OR
{
    "message": "Password cannot be null"
}
OR
{
    "message": "Email must be unique"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /login/google

Request:

- body:

```json
{
  "credential": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Google credentials"
}
```

&nbsp;

## 4. GET /profile

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "id": 4,
  "username": "rian",
  "email": "rian@gmail.com",
  "height": 184,
  "weight": 63,
  "age": 11,
  "gender": "male",
  "activity_level": "low",
  "diet": null,
  "allergies": [],
  "createdAt": "2025-02-28T01:40:56.117Z",
  "updatedAt": "2025-02-28T07:14:48.339Z"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 5. PUT /profile

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "height": 170.5,
  "weight": 30.2,
  "age": 30,
  "gender": "male",
  "activity_level": "light",
  "diet": "vegetarian",
  "allergies": []
}
```

_Response (200 - OK)_

```json
{
  "message": "Profile updated successfully"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Height is required"
}
OR
{
    "message": "Weight is required"
}
OR
{
    "message": "Age is required"
}
OR
{
    "message": "Gender must be either 'male' or 'female'"
}
OR
{
    "message": "Activity level must be either 'low', 'light', 'moderate', 'high', or 'very_high'"
}
```

&nbsp;

## 6. GET /my-recipes

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 3,
    "UserId": 4,
    "RecipeId": 1,
    "is_favorite": false,
    "notes": null,
    "createdAt": "2025-02-28T02:36:17.339Z",
    "updatedAt": "2025-02-28T02:36:17.339Z",
    "Recipe": {
      "id": 1,
      "spoonacular_id": 716429,
      "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      "image_url": "https://img.spoonacular.com/recipes/716429-556x370.jpg",
      "servings": 2,
      "ready_in_minutes": 45,
      "health_score": 18,
      "summary": "You can never have too many main course recipes, so give Pasta with Garlic, ...",
      "instructions": "",
      "vegetarian": false,
      "vegan": false,
      "gluten_free": false,
      "dairy_free": false,
      "very_healthy": false,
      "cheap": false,
      "cooking_minutes": 25,
      "preparation_minutes": 20,
      "dish_types": "[\"side dish\",\"lunch\",\"main course\",\"main dish\",\"dinner\"]",
      "ingredients": "[\"butter\",\"cauliflower florets\",\"cheese\",\"extra virgin olive oil\",\"garlic\",\"pasta\",\"couple of pepper flakes\",...",
      "createdAt": "2025-02-28T01:14:12.221Z",
      "updatedAt": "2025-02-28T01:14:12.221Z"
    }
  },
  {
    "id": 5,
    "UserId": 4,
    "RecipeId": 25,
    "is_favorite": false,
    "notes": "jangan lupa tambah garam\n",
    "createdAt": "2025-02-28T07:12:42.798Z",
    "updatedAt": "2025-02-28T07:13:04.141Z",
    "Recipe": {
      "id": 25,
      "spoonacular_id": 719126,
      "title": "Easy Chocolate Chip Banana Bread (vegan)",
      "image_url": "https://img.spoonacular.com/recipes/719126-556x370.jpg",
      "servings": 8,
      "ready_in_minutes": 70,
      "health_score": 11,
      "summary": "If you want to add more <b>vegetarian</b> recipes to your collection, Easy Chocolate Chip Banana Bread (vegan) might be a recipe you should try. This recipe makes 8 ...",
      "vegetarian": true,
      "vegan": false,
      "gluten_free": false,
      "dairy_free": false,
      "very_healthy": false,
      "cheap": false,
      "cooking_minutes": null,
      "preparation_minutes": null,
      "dish_types": "[]",
      "ingredients": "[\"baking powder\",\"bananas\",\"cream\",\"dark chocolate chips\",\"flax seeds\",\"milk powder\",\"plain flour\",\"salt\",\"sugar\",\"vanilla bean paste\"]",
      "createdAt": "2025-02-28T01:14:12.226Z",
      "updatedAt": "2025-02-28T01:14:12.226Z"
    }
  }
]
```

&nbsp;

## 7. GET /my-recipes/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
  - `id`: Recipe ID (required)

_Response (200 - OK)_

```json
{
  "id": 1,
  "spoonacular_id": 716429,
  "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  "image_url": "https://img.spoonacular.com/recipes/716429-556x370.jpg",
  "servings": 2,
  "ready_in_minutes": 45,
  "health_score": 18,
  "summary": "You can never have too many main course recipes, so give Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs a try...",
  "instructions": "",
  "vegetarian": false,
  "vegan": false,
  "gluten_free": false,
  "dairy_free": false,
  "very_healthy": false,
  "cheap": false,
  "cooking_minutes": 25,
  "preparation_minutes": 20,
  "dish_types": "[\"side dish\",\"lunch\",\"main course\",\"main dish\",\"dinner\"]",
  "ingredients": "[\"butter\",\"cauliflower florets\",\"cheese\",\"extra virgin olive oil\",\"garlic\",\"pasta\",\"couple of pepper flakes\",\"salt and pepper\",\"scallions\",\"white wine\",\"bread crumbs\"]",
  "createdAt": "2025-02-28T01:14:12.221Z",
  "updatedAt": "2025-02-28T01:14:12.221Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found"
}
```

&nbsp;

## 8. GET /my-recipes/full-detail/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
  - `id`: Recipe ID (required)

_Response (200 - OK)_

```json
{
  "id": 665734,
  "image": "https://img.spoonacular.com/recipes/665734-556x370.jpg",
  "imageType": "jpg",
  "title": "Zucchini Chicken Omelette",
  "readyInMinutes": 45,
  "servings": 2,
  "sourceUrl": "https://www.foodista.com/recipe/TPJ6QNBY/zucchini-chicken-omelette",
  "vegetarian": false,
  "vegan": false,
  "glutenFree": true,
  "dairyFree": true,
  "veryHealthy": false,
  "cheap": false,
  "veryPopular": false,
  "sustainable": false,
  "lowFodmap": true,
  "weightWatcherSmartPoints": 5,
  "gaps": "no",
  "preparationMinutes": null,
  "cookingMinutes": null,
  "aggregateLikes": 6,
  "healthScore": 4,
  "creditsText": "foodista.com",
  "license": null,
  "sourceName": "foodista.com",
  "pricePerServing": 72.21,
  "extendedIngredients": [
    {
      "id": 1123,
      "aisle": "Milk, Eggs, Other Dairy",
      "image": "egg.png",
      "consistency": "SOLID",
      "name": "eggs",
      "nameClean": "egg",
      "original": "3 Eggs",
      "originalName": "Eggs",
      "amount": 3,
      "unit": "",
      "meta": [],
      "measures": {
        "us": { "amount": 3, "unitShort": "", "unitLong": "" },
        "metric": { "amount": 3, "unitShort": "", "unitLong": "" }
      }
    },
    {
      "id": 14412,
      "aisle": "Beverages",
      "image": "water.png",
      "consistency": "LIQUID",
      "name": "water",
      "nameClean": "water",
      "original": "1 tablespoon Water",
      "originalName": "Water",
      "amount": 1,
      "unit": "tablespoon",
      "meta": [],
      "measures": {
        "us": { "amount": 1, "unitShort": "Tbsp", "unitLong": "Tbsp" },
        "metric": { "amount": 1, "unitShort": "Tbsp", "unitLong": "Tbsp" }
      }
    },
    ...
  ],
  "summary": "Zucchini Chicken Omelette is a main course that serves 2. For <b>72 cents per serving</b>...",
  "cuisines": [],
  "dishTypes": [
    "lunch",
    "main course",
    ...
  ],
  "diets": [
    "gluten free",
    "dairy free",
    ...
  ],
  "occasions": [],
  "instructions": "Beat eggs and water in a bowl. Mix in grated zucchini and season with salt and pepper...",
  "analyzedInstructions": [
    {
      "name": "",
      "steps": [
        {
          "number": 1,
          "step": "Beat eggs and water in a bowl.",
          "ingredients": [
            {
              "id": 14412,
              "name": "water",
              "localizedName": "water",
              "image": "water.png"
            },
            {
              "id": 1123,
              "name": "egg",
              "localizedName": "egg",
              "image": "egg.png"
            }
          ],
          "equipment": [
            {
              "id": 404783,
              "name": "bowl",
              "localizedName": "bowl",
              "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
            }
          ]
        },
        {
          "number": 2,
          "step": "Mix in grated zucchini and season with salt and pepper.",
          "ingredients": [
            {
              "id": 1102047,
              "name": "salt and pepper",
              "localizedName": "salt and pepper",
              "image": "salt-and-pepper.jpg"
            },
            {
              "id": 11477,
              "name": "zucchini",
              "localizedName": "zucchini",
              "image": "zucchini.jpg"
            }
          ],
          "equipment": []
        },
      ]
    }
  ],
  "originalId": null,
  "spoonacularScore": 44.02309799194336,
  "spoonacularSourceUrl": "https://spoonacular.com/zucchini-chicken-omelette-665734"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found"
}
```

&nbsp;

## 9. POST /my-recipes/add/:spoonacularId

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
  - `spoonacularId`: Spoonacular Recipe ID (required)

_Response (201 - Created)_

```json
{
  "id": 6,
  "UserId": 4,
  "RecipeId": 28,
  "updatedAt": "2025-02-28T13:46:25.719Z",
  "createdAt": "2025-02-28T13:46:25.719Z",
  "is_favorite": false,
  "notes": null
}
```

_Response (400 - Bad Request)_

```json
{ "message": "Resep ini sudah ada di koleksi Anda" }
```

&nbsp;

## 10. DELETE /my-recipes/delete/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
  - `id`: Recipe ID (required)

_Response (200 - OK)_

```json
{ "message": "Recipe removed from saved recipes" }
```

_Response (404 - Not Found)_

```json
{
  "message": "Your recipe not found"
}
```

&nbsp;

## 11. PUT /my-recipes/note/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

  - `id`: Recipe ID (required)

- body:

```json
{
  "notes": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 5,
  "UserId": 4,
  "RecipeId": 25,
  "is_favorite": false,
  "notes": "jangan lupa tambahkan garam",
  "createdAt": "2025-02-28T07:12:42.798Z",
  "updatedAt": "2025-02-28T13:49:57.000Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Your recipe not found"
}
```

&nbsp;

## 12. GET /recipes/random

Query parameters:

- `number`: Number of random recipes (optional, default 1)
- `tags`: Comma-separated tags (optional)

_Response (200 - OK)_

```json
{
  "recipes": [
    {
      "id": 637099,
      "image": "https://img.spoonacular.com/recipes/637099-556x370.jpg",
      "imageType": "jpg",
      "title": "Caribbean black bean and sweet potato soup",
      "readyInMinutes": 45,
      "servings": 6,
      "sourceUrl": "https://www.foodista.com/recipe/4YVH7XVD/caribbean-black-bean-and-sweet-potato-soup",
      "vegetarian": true,
      "vegan": true,
      "glutenFree": true,
      "dairyFree": true,
      "veryHealthy": false,
      "cheap": false,
      "veryPopular": false,
      "sustainable": false,
      "lowFodmap": false,
      "weightWatcherSmartPoints": 4,
      "gaps": "no",
      "preparationMinutes": null,
      "cookingMinutes": null,
      "aggregateLikes": 3,
      "healthScore": 11,
      "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      "license": "CC BY 3.0",
      "sourceName": "Foodista",
      "pricePerServing": 196.96,
      "extendedIngredients": [
        {
          "id": 93711,
          "aisle": "Produce",
          "image": "yellow-wax-beans.png",
          "consistency": "SOLID",
          "name": "turtle beans",
          "nameClean": "wax beans",
          "original": "1 pound dry organic black turtle beans",
          "originalName": "dry organic black turtle beans",
          "amount": 1,
          "unit": "pound",
          "meta": ["black", "dry", "organic"],
          "measures": {
            "us": {
              "amount": 1,
              "unitShort": "lb",
              "unitLong": "pound"
            },
            "metric": {
              "amount": 453.592,
              "unitShort": "g",
              "unitLong": "grams"
            }
          }
        },
        {
          "id": 4047,
          "aisle": "Health Foods",
          "image": "oil-coconut.jpg",
          "consistency": "LIQUID",
          "name": "coconut oil",
          "nameClean": "coconut oil",
          "original": "2 tablespoons organic coconut oil (or olive oil)",
          "originalName": "organic coconut oil (or olive oil)",
          "amount": 2,
          "unit": "tablespoons",
          "meta": ["organic", "(or olive oil)"],
          "measures": {
            "us": {
              "amount": 2,
              "unitShort": "Tbsps",
              "unitLong": "Tbsps"
            },
            "metric": {
              "amount": 2,
              "unitShort": "Tbsps",
              "unitLong": "Tbsps"
            }
          }
        },
       ...
      ],
      "summary": "If you want to add more <b>gluten free, dairy free, lacto ovo vegetarian, and vegan</b> recipes to your recipe box..",
      "cuisines": ["Central American", "Caribbean"],
      "dishTypes": [
        "antipasti",
        "soup",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ],
      "diets": ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan"],
      "occasions": ["fall", "winter"],
      "instructions": "Rinse beans and place in a large bowl. Cover beans with   4 inches of water and soak overnight (or 8 hours)...",
      "analyzedInstructions": [
        {
          "name": "",
          "steps": [
            {
              "number": 1,
              "step": "Rinse beans and place in a large bowl. Cover beans with   4 inches of water and soak overnight (or 8 hours). Strain and rinse black beans.",
              "ingredients": [
                {
                  "id": 16015,
                  "name": "black beans",
                  "localizedName": "black beans",
                  "image": "black-beans.jpg"
                },
                {
                  "id": 0,
                  "name": "beans",
                  "localizedName": "beans",
                  "image": "kidney-beans.jpg"
                },
                {
                  "id": 14412,
                  "name": "water",
                  "localizedName": "water",
                  "image": "water.png"
                }
              ],
              "equipment": [
                {
                  "id": 404783,
                  "name": "bowl",
                  "localizedName": "bowl",
                  "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
                }
              ],
              "length": {
                "number": 480,
                "unit": "minutes"
              }
            },
            {
              "number": 2,
              "step": "In a large soup pot, heat the oil over medium heat.",
              "ingredients": [
                {
                  "id": 0,
                  "name": "soup",
                  "localizedName": "soup",
                  "image": ""
                },
                {
                  "id": 4582,
                  "name": "cooking oil",
                  "localizedName": "cooking oil",
                  "image": "vegetable-oil.jpg"
                }
              ],
              "equipment": [
                {
                  "id": 404752,
                  "name": "pot",
                  "localizedName": "pot",
                  "image": "https://spoonacular.com/cdn/equipment_100x100/stock-pot.jpg"
                }
              ]
            },
            ...
          ]
        }
      ],
      "originalId": null,
      "spoonacularScore": 57.343502044677734,
      "spoonacularSourceUrl": "https://spoonacular.com/caribbean-black-bean-and-sweet-potato-soup-637099"
    }
  ]
}
```

&nbsp;

## 13. GET /recipes/findByIngredients

Query parameters:

- `ingredients`: Comma-separated ingredients (required)
- `number`: Number of results (optional, default 5)

_Response (200 - OK)_

```json
[
  {
    "id": 647922,
    "title": "Insalata Caprese With Pesto Vinaigrette",
    "image": "https://img.spoonacular.com/recipes/647922-312x231.jpg",
    "imageType": "jpg",
    "usedIngredientCount": 4,
    "missedIngredientCount": 1,
    "missedIngredients": [
      {
        "id": 2069,
        "amount": 2,
        "unit": "tablespoons",
        "unitLong": "tablespoons",
        "unitShort": "Tbsp",
        "aisle": "Oil, Vinegar, Salad Dressing",
        "name": "balsamic vinegar",
        "original": "2 tablespoons balsamic vinegar",
        "originalName": "balsamic vinegar",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/balsamic-vinegar.jpg"
      }
    ],
    "usedIngredients": [
      {
        "id": 1021026,
        "amount": 1,
        "unit": "pound",
        "unitLong": "pound",
        "unitShort": "lb",
        "aisle": "Cheese",
        "name": "mozzarella cheese",
        "original": "1 pound fresh mozzarella cheese sliced ¼\" thick",
        "originalName": "fresh mozzarella cheese sliced ¼\" thick",
        "meta": ["fresh", "thick", "sliced"],
        "extendedName": "fresh mozzarella cheese",
        "image": "https://img.spoonacular.com/ingredients_100x100/mozzarella.png"
      },
      {
        "id": 11529,
        "amount": 4,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "tomatoes 1/\" inch",
        "original": "4 ripe tomatoes sliced 1/4\" inch thick",
        "originalName": "ripe tomatoes sliced 1/4\" inch thick",
        "meta": ["thick", "ripe", "sliced"],
        "image": "https://img.spoonacular.com/ingredients_100x100/tomato.png"
      },
      ...
    ],
    "unusedIngredients": [],
    "likes": 2
  },
  {
    "id": 636954,
    "title": "Caprese Pesto Margherita Stackers",
    "image": "https://img.spoonacular.com/recipes/636954-312x231.jpg",
    "imageType": "jpg",
    "usedIngredientCount": 4,
    "missedIngredientCount": 2,
    "missedIngredients": [
      {
        "id": 93698,
        "amount": 3,
        "unit": "tablespoons",
        "unitLong": "tablespoons",
        "unitShort": "Tbsp",
        "aisle": "Pasta and Rice",
        "name": "basil pesto",
        "original": "3 tablespoons basil pesto",
        "originalName": "basil pesto",
        "meta": [],
        "image": "https://img.spoonacular.com/ingredients_100x100/basil-pesto.png"
      },
      {
        "id": 98918,
        "amount": 11,
        "unit": "ounce",
        "unitLong": "ounces",
        "unitShort": "oz",
        "aisle": "Refrigerated",
        "name": "pillsbury original breadstick dough",
        "original": "1 can (11 ounce) Pillsbury refrigerated original breadstick dough",
        "originalName": "can Pillsbury refrigerated original breadstick dough",
        "meta": ["refrigerated", "canned"],
        "extendedName": "canned refrigerated pillsbury original breadstick dough",
        "image": "https://img.spoonacular.com/ingredients_100x100/bread-sticks.jpg"
      }
    ],
    "usedIngredients": [
      {
        "id": 2044,
        "amount": 24,
        "unit": "",
        "unitLong": "",
        "unitShort": "",
        "aisle": "Produce",
        "name": "basil leaves",
        "original": "24 fresh basil leaves",
        "originalName": "fresh basil leaves",
        "meta": ["fresh"],
        "extendedName": "fresh basil leaves",
        "image": "https://img.spoonacular.com/ingredients_100x100/fresh-basil.jpg"
      },
      {
        "id": 1021026,
        "amount": 8,
        "unit": "ounce",
        "unitLong": "ounces",
        "unitShort": "oz",
        "aisle": "Cheese",
        "name": "mozzarella cheese",
        "original": "1 container (8 ounce) fresh mozzarella cheese (24 cherry-size balls)",
        "originalName": "container fresh mozzarella cheese (24 cherry-size balls)",
        "meta": ["fresh", "(24 cherry-size balls)"],
        "extendedName": "fresh mozzarella cheese",
        "image": "https://img.spoonacular.com/ingredients_100x100/mozzarella.png"
      },
      ...
    ],
    "unusedIngredients": [],
    "likes": 1
  }
]
```

&nbsp;

## 14. GET /recipes/generateByNutrients

_Response (200 - OK)_

```json
[
  {
    "nutritionInfo": {
      "bmi": 10.41,
      "bmiCategory": "Underweight",
      "dailyCalories": 1211,
      "macronutrients": {
        "carbs": {
          "percentage": 50,
          "grams": 151,
          "perMeal": { "min": 40, "max": 60 }
        },
        "protein": {
          "percentage": 20,
          "grams": 61,
          "perMeal": { "min": 16, "max": 24 }
        },
        "fat": {
          "percentage": 30,
          "grams": 40,
          "perMeal": { "min": 11, "max": 16 }
        }
      },
      "caloriesPerMeal": { "min": 363, "max": 444 }
    },
    "recipes": {
      "results": [
        {
          "id": 635126,
          "title": "Black Lentil and Couscous Salad",
          "image": "https://img.spoonacular.com/recipes/635126-312x231.jpg",
          "imageType": "jpg",
          "nutrition": {
            "nutrients": [
              { "name": "Calories", "amount": 438.297, "unit": "kcal" },
              { "name": "Protein", "amount": 18.304, "unit": "g" },
              { "name": "Fat", "amount": 15.592, "unit": "g" },
              { "name": "Carbohydrates", "amount": 45.4903, "unit": "g" }
            ]
          }
        },
        {
          "id": 647876,
          "title": "Indian-Style Eggs On Toast",
          "image": "https://img.spoonacular.com/recipes/647876-312x231.jpg",
          "imageType": "jpg",
          "nutrition": {
            "nutrients": [
              { "name": "Calories", "amount": 379.415, "unit": "kcal" },
              { "name": "Protein", "amount": 20.9819, "unit": "g" },
              { "name": "Fat", "amount": 12.3596, "unit": "g" },
              { "name": "Carbohydrates", "amount": 41.0559, "unit": "g" }
            ]
          }
        },
        {
          "id": 716421,
          "title": "Grilled Peach Melba with Vanilla Bean Frozen Yogurt",
          "image": "https://img.spoonacular.com/recipes/716421-312x231.jpg",
          "imageType": "jpg",
          "nutrition": {
            "nutrients": [
              { "name": "Calories", "amount": 377.268, "unit": "kcal" },
              { "name": "Protein", "amount": 16.8943, "unit": "g" },
              { "name": "Fat", "amount": 15.1477, "unit": "g" },
              { "name": "Carbohydrates", "amount": 44.2652, "unit": "g" }
            ]
          }
        }
      ],
      "offset": 0,
      "number": 5,
      "totalResults": 3
    }
  }
]
```

&nbsp;

## 15. GET /recipes/generateIngredientRecommendations

_Response (200 - OK)_

```json
{
  "recommendedIngredients": [
    "Lentils",
    "Spinach",
    "Quinoa",
    "Almonds",
    "Chia Seeds"
  ],
  "recipes": {
    "results": [
      {
        "id": 716406,
        "title": "Asparagus and Pea Soup: Real Convenience Food",
        "image": "https://img.spoonacular.com/recipes/716406-312x231.jpg",
        "imageType": "jpg"
      },
      {
        "id": 644387,
        "title": "Garlicky Kale",
        "image": "https://img.spoonacular.com/recipes/644387-312x231.jpg",
        "imageType": "jpg"
      },
      {
        "id": 782601,
        "title": "Red Kidney Bean Jambalaya",
        "image": "https://img.spoonacular.com/recipes/782601-312x231.jpg",
        "imageType": "jpg"
      },
      {
        "id": 716426,
        "title": "Cauliflower, Brown Rice, and Vegetable Fried Rice",
        "image": "https://img.spoonacular.com/recipes/716426-312x231.jpg",
        "imageType": "jpg"
      },
      {
        "id": 716004,
        "title": "Quinoa and Chickpea Salad with Sun-Dried Tomatoes and Dried Cherries",
        "image": "https://img.spoonacular.com/recipes/716004-312x231.jpg",
        "imageType": "jpg"
      },
      {
        "id": 716627,
        "title": "Easy Homemade Rice and Beans",
        "image": "https://img.spoonacular.com/recipes/716627-312x231.jpg",
        "imageType": "jpg"
      }
    ],
    "offset": 0,
    "number": 6,
    "totalResults": 2177
  }
}
```

&nbsp;

## 16. GET /recipes/mostRecent

_Response (200 - OK)_

```json
[
  {
    "id": 28,
    "spoonacular_id": 123125,
    "title": "Chamomile, Honey, and Pear Glazed Fruit Salad",
    "image_url": "https://img.spoonacular.com/recipes/123125-556x370.jpg",
    "servings": 6,
    "ready_in_minutes": 25,
    "health_score": 12,
    "summary": "Chamomile, Honey, and Pear Glazed Fruit Salad takes around <b>25 minutes</b> from beginning to end....",
    "instructions": null,
    "vegetarian": true,
    "vegan": false,
    "gluten_free": true,
    "dairy_free": true,
    "very_healthy": false,
    "cheap": false,
    "cooking_minutes": 10,
    "preparation_minutes": 15,
    "dish_types": "[\"side dish\",\"antipasti\",\"salad\",\"starter\",\"snack\",\"appetizer\",\"antipasto\",\"hor d'oeuvre\"]",
    "ingredients": "[\"banana\",\"bananas\",\"grapes\",\"cinnamon\",\"honey\",\"honeydew melon\",\"mango\",\"nutmeg\",\"pear\",\"powdered sugar\",\"tea bags\",\"white wine\"]",
    "createdAt": "2025-02-28T13:46:25.618Z",
    "updatedAt": "2025-02-28T13:46:25.618Z"
  },
  {
    "id": 27,
    "spoonacular_id": 665734,
    "title": "Zucchini Chicken Omelette",
    "image_url": "https://img.spoonacular.com/recipes/665734-556x370.jpg",
    "servings": 2,
    "ready_in_minutes": 45,
    "health_score": 4,
    "summary": "Zucchini Chicken Omelette is a main course that serves 2. For <b>72 cents per...",
    "vegetarian": false,
    "vegan": false,
    "gluten_free": true,
    "dairy_free": true,
    "very_healthy": false,
    "cheap": false,
    "cooking_minutes": null,
    "preparation_minutes": null,
    "dish_types": "[\"lunch\",\"main course\",\"morning meal\",\"brunch\",\"main dish\",\"breakfast\",\"dinner\"]",
    "ingredients": "[\"eggs\",\"water\",\"zucchini\",\"salt and pepper\",\"oil\",\"milanese chicken left over\"]",
    "createdAt": "2025-02-28T02:00:46.787Z",
    "updatedAt": "2025-02-28T02:00:46.787Z"
  },
  {
    "id": 26,
    "spoonacular_id": 719312,
    "title": "Pineapple Mango Overnight Oats",
    "image_url": "https://img.spoonacular.com/recipes/719312-556x370.jpg",
    "servings": 2,
    "ready_in_minutes": 480,
    "health_score": 12,
    "summary": "Pineapple Mango Overnight Oats requires around <b>8 hours</b> from start to finish. This recipe...",
    "vegetarian": false,
    "vegan": false,
    "gluten_free": true,
    "dairy_free": true,
    "very_healthy": false,
    "cheap": false,
    "cooking_minutes": 0,
    "preparation_minutes": 480,
    "dish_types": "[\"side dish\"]",
    "ingredients": "[\"agave syrup\",\"almond milk\",\"mangoes\",\"pineapple chunks\",\"rolled oats\",\"salt\",\"sized mason jars\"]",
    "createdAt": "2025-02-28T01:14:12.226Z",
    "updatedAt": "2025-02-28T01:14:12.226Z"
  },
  {
    "id": 22,
    "spoonacular_id": 718568,
    "title": "Roasted Broccoli Tomato Soup",
    "image_url": "https://img.spoonacular.com/recipes/718568-556x370.jpg",
    "servings": 2,
    "ready_in_minutes": 15,
    "health_score": 33,
    "summary": "Roasted Broccoli Tomato Soup might be a good recipe to expand your soup recipe box. For <b>75 cents per serving...",
    "vegetarian": false,
    "vegan": false,
    "gluten_free": true,
    "dairy_free": true,
    "very_healthy": false,
    "cheap": false,
    "cooking_minutes": 5,
    "preparation_minutes": 10,
    "dish_types": "[\"soup\"]",
    "ingredients": "[\"black pepper\",\"broccoli florets\",\"condensed tomato soup\",\"extra virgin olive oil\",\"kosher salt\"]",
    "createdAt": "2025-02-28T01:14:12.226Z",
    "updatedAt": "2025-02-28T01:14:12.226Z"
  }
]
```

&nbsp;

## 17. GET /recipes/categories/:category

Request:

- params:
  - `category`: Category name (required)

_Response (200 - OK)_

```json
{
  "results": [
    {
      "id": 715415,
      "title": "Red Lentil Soup with Chicken and Turnips",
      "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 715446,
      "title": "Slow Cooker Beef Stew",
      "image": "https://img.spoonacular.com/recipes/715446-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 782601,
      "title": "Red Kidney Bean Jambalaya",
      "image": "https://img.spoonacular.com/recipes/782601-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 716004,
      "title": "Quinoa and Chickpea Salad with Sun-Dried Tomatoes and Dried Cherries",
      "image": "https://img.spoonacular.com/recipes/716004-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 716627,
      "title": "Easy Homemade Rice and Beans",
      "image": "https://img.spoonacular.com/recipes/716627-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 664147,
      "title": "Tuscan White Bean Soup with Olive Oil and Rosemary",
      "image": "https://img.spoonacular.com/recipes/664147-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 660306,
      "title": "Slow Cooker: Pork and Garbanzo Beans",
      "image": "https://img.spoonacular.com/recipes/660306-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 715769,
      "title": "Broccolini Quinoa Pilaf",
      "image": "https://img.spoonacular.com/recipes/715769-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 636589,
      "title": "Butternut Squash Frittata",
      "image": "https://img.spoonacular.com/recipes/636589-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 646738,
      "title": "Herbivoracious' White Bean and Kale Soup",
      "image": "https://img.spoonacular.com/recipes/646738-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 663559,
      "title": "Tomato and lentil soup",
      "image": "https://img.spoonacular.com/recipes/663559-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 715421,
      "title": "Cheesy Chicken Enchilada Quinoa Casserole",
      "image": "https://img.spoonacular.com/recipes/715421-312x231.jpg",
      "imageType": "jpg"
    }
  ],
  "offset": 0,
  "number": 12,
  "totalResults": 1715
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Category not found"
}
```

&nbsp;

## 18. GET /recipes/server/:id

Request:

- params:
  - `id`: Recipe ID in server database (required)

_Response (200 - OK)_

```json
{
  "id": 1,
  "spoonacular_id": 716429,
  "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  "image_url": "https://img.spoonacular.com/recipes/716429-556x370.jpg",
  "servings": 2,
  "ready_in_minutes": 45,
  "health_score": 18,
  "summary": "You can never have too many main course recipes, so give Pasta with Garlic, Scallions, ...",
  "instructions": "",
  "vegetarian": false,
  "vegan": false,
  "gluten_free": false,
  "dairy_free": false,
  "very_healthy": false,
  "cheap": false,
  "cooking_minutes": 25,
  "preparation_minutes": 20,
  "dish_types": "[\"side dish\",\"lunch\",\"main course\",\"main dish\",\"dinner\"]",
  "ingredients": "[\"butter\",\"cauliflower florets\",\"cheese\",\"extra virgin olive oil\",\"garlic\",\"pasta\",\"couple of pepper flakes\",\"salt and pepper\",\"scallions\",\"white wine\",\"bread crumbs\"]",
  "createdAt": "2025-02-28T01:14:12.221Z",
  "updatedAt": "2025-02-28T01:14:12.221Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found"
}
```

&nbsp;

## 19. GET /recipes/spoonacular/:id

Request:

- params:
  - `id`: Spoonacular Recipe ID (required)

_Response (200 - OK)_

```json
{
  "id": 1,
  "image": "https://img.spoonacular.com/recipes/1-556x370.jpg",
  "imageType": "jpg",
  "title": "Fried Anchovies with Sage",
  "readyInMinutes": 45,
  "servings": 3,
  "sourceUrl": "http://latavolamarcherecipebox.blogspot.com/2009/10/fried-anchovies-with-sage.html",
  "vegetarian": false,
  "vegan": false,
  "glutenFree": false,
  "dairyFree": true,
  "veryHealthy": false,
  "cheap": false,
  "veryPopular": false,
  "sustainable": false,
  "lowFodmap": false,
  "weightWatcherSmartPoints": 9,
  "gaps": "no",
  "preparationMinutes": null,
  "cookingMinutes": null,
  "aggregateLikes": 3,
  "healthScore": 23,
  "creditsText": "blogspot.com",
  "license": null,
  "sourceName": "blogspot.com",
  "pricePerServing": 560.51,
  "extendedIngredients": [
    {
      "id": 15001,
      "aisle": "Seafood",
      "image": "anchovies.jpg",
      "consistency": "SOLID",
      "name": "anchovies",
      "nameClean": "boquerones",
      "original": "1lb of anchovies cleaned, spine removed",
      "originalName": "anchovies cleaned, spine removed",
      "amount": 1,
      "unit": "lb",
      "meta": ["cleaned"],
      "measures": {
        "us": { "amount": 1, "unitShort": "lb", "unitLong": "pound" },
        "metric": { "amount": 453.592, "unitShort": "g", "unitLong": "grams" }
      }
    },
    {
      "id": 18369,
      "aisle": "Baking",
      "image": "white-powder.jpg",
      "consistency": "SOLID",
      "name": "baking powder",
      "nameClean": "baking powder",
      "original": "1 teaspoon of baking powder",
      "originalName": "baking powder",
      "amount": 1,
      "unit": "teaspoon",
      "meta": [],
      "measures": {
        "us": { "amount": 1, "unitShort": "tsp", "unitLong": "teaspoon" },
        "metric": { "amount": 1, "unitShort": "tsp", "unitLong": "teaspoon" }
      }
    },
    ...
  ],
  "summary": "Fried Anchovies with Sage could be just the <b>dairy free and pescatarian</b> recipe you've been looking for....",
  "cuisines": [],
  "dishTypes": ["lunch", "main course", "main dish", "dinner"],
  "diets": ["dairy free", "pescatarian"],
  "occasions": [],
  "instructions": "<p>If you have not tried anchovies before - you must try them now! Get over any weird apprehensions or that its just bait or a punchline for a joke about pizza (\"extra anchovies\")...",
  "analyzedInstructions": [
    {
      "name": "",
      "steps": [
        {
          "number": 1,
          "step": "If you have not tried anchovies before - you must try them now! Get over any weird apprehensions or that its just bait or a punchline for a joke about pizza (\"extra anchovies\")! These little suckers are delicious &amp; actually good for you!",
          "ingredients": [
            {
              "id": 15001,
              "name": "anchovies",
              "localizedName": "anchovies",
              "image": "anchovies.jpg"
            },
            {
              "id": 0,
              "name": "lollipops",
              "localizedName": "lollipops",
              "image": "no.jpg"
            }
          ],
          "equipment": []
        },
        {
          "number": 2,
          "step": "Baked, fried &amp; grilled - they are ohh so good and worth a try. If your not up to it, then pass me your plate because I love'em!Here is my favorite - Fried Anchovies - the recipe below adds a sage leave to each piece of fish as well for an extra burst of flavor &amp; color.Fried Anchovies with Sage",
          "ingredients": [
            {
              "id": 15001,
              "name": "anchovies",
              "localizedName": "anchovies",
              "image": "anchovies.jpg"
            },
            {
              "id": 10115261,
              "name": "fish",
              "localizedName": "fish",
              "image": "fish-fillet.jpg"
            },
            {
              "id": 99226,
              "name": "sage",
              "localizedName": "sage",
              "image": "fresh-sage.png"
            }
          ],
          "equipment": []
        },
        ...
      ]
    }
  ],
  "originalId": null,
  "spoonacularScore": 72.0345230102539
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found in Spoonacular API"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
