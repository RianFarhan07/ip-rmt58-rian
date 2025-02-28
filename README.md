# RecipePedia API Documentation

## Endpoints:

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login/google`
- `GET /profile`
- `PUT /profile`
- `GET /my-recipes`
- `GET /my-recipes/cuisines/:id`
- `GET /my-recipes/full-detail/:id`
- `POST /my-recipes/add/:spoonacularId`
- `DELETE /my-recipes/delete/:id`
- `PUT /my-recipes/note/:id`
- `GET /my-recipes/:id`
- `GET /recipes`
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
  "id": 1,
  "username": "rian",
  "email": "rian@gmail.com",
  "createdAt": "2024-02-13T12:00:00.000Z",
  "updatedAt": "2024-02-13T12:00:00.000Z"
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
  "username": "string",
  "email": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "username": "rian_updated",
  "email": "rian_updated@gmail.com",
  "createdAt": "2024-02-13T12:00:00.000Z",
  "updatedAt": "2024-02-14T12:00:00.000Z"
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
  "message": "Email must be unique"
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
    "id": 1,
    "userId": 1,
    "spoonacularId": 654959,
    "title": "Pasta With Tuna",
    "image": "https://spoonacular.com/recipeImages/654959-556x370.jpg",
    "createdAt": "2024-02-13T12:00:00.000Z",
    "updatedAt": "2024-02-13T12:00:00.000Z"
  },
  {
    "id": 2,
    "userId": 1,
    "spoonacularId": 511728,
    "title": "Pasta Margherita",
    "image": "https://spoonacular.com/recipeImages/511728-556x370.jpg",
    "createdAt": "2024-02-13T12:00:00.000Z",
    "updatedAt": "2024-02-13T12:00:00.000Z"
  }
]
```

&nbsp;

## 7. GET /my-recipes/cuisines/:id

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
  "userId": 1,
  "spoonacularId": 654959,
  "title": "Pasta With Tuna",
  "image": "https://spoonacular.com/recipeImages/654959-556x370.jpg",
  "cuisines": ["Italian", "Mediterranean"],
  "createdAt": "2024-02-13T12:00:00.000Z",
  "updatedAt": "2024-02-13T12:00:00.000Z"
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
  "id": 1,
  "userId": 1,
  "spoonacularId": 654959,
  "title": "Pasta With Tuna",
  "image": "https://spoonacular.com/recipeImages/654959-556x370.jpg",
  "servings": 4,
  "readyInMinutes": 45,
  "cuisines": ["Italian", "Mediterranean"],
  "dishTypes": ["lunch", "main course", "dinner"],
  "summary": "Pasta With Tuna is a main course that serves 4. One portion of this dish contains approximately 22g of protein...",
  "instructions": "Cook the pasta according to package directions. In a large skillet, heat olive oil over medium heat...",
  "ingredients": [
    {
      "id": 10311529,
      "name": "cherry tomato",
      "amount": 10,
      "unit": ""
    },
    {
      "id": 11215,
      "amount": 1,
      "unit": "clove",
      "name": "garlic"
    }
  ],
  "nutrition": {
    "nutrients": [
      {
        "name": "Calories",
        "amount": 522.15,
        "unit": "kcal"
      },
      {
        "name": "Protein",
        "amount": 22.83,
        "unit": "g"
      }
    ]
  },
  "notes": "This recipe is great for a quick weeknight dinner.",
  "createdAt": "2024-02-13T12:00:00.000Z",
  "updatedAt": "2024-02-13T12:00:00.000Z"
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
  "id": 3,
  "userId": 1,
  "spoonacularId": 511728,
  "title": "Pasta Margherita",
  "image": "https://spoonacular.com/recipeImages/511728-556x370.jpg",
  "createdAt": "2024-02-14T12:00:00.000Z",
  "updatedAt": "2024-02-14T12:00:00.000Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Recipe already saved"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found in Spoonacular API"
}
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
{
  "message": "Recipe deleted successfully"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found"
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
  "id": 1,
  "userId": 1,
  "spoonacularId": 654959,
  "notes": "I added extra garlic and it was delicious!",
  "updatedAt": "2024-02-14T12:00:00.000Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found"
}
```

&nbsp;

## 12. GET /my-recipes/:id

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
  "userId": 1,
  "spoonacularId": 654959,
  "title": "Pasta With Tuna",
  "image": "https://spoonacular.com/recipeImages/654959-556x370.jpg",
  "notes": "I added extra garlic and it was delicious!",
  "createdAt": "2024-02-13T12:00:00.000Z",
  "updatedAt": "2024-02-14T12:00:00.000Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found"
}
```

&nbsp;

## 13. GET /recipes

Query parameters:

- `query`: Search term (optional)
- `cuisine`: Cuisine type (optional)
- `diet`: Diet restrictions (optional)
- `number`: Number of results (optional, default 10)

_Response (200 - OK)_

```json
{
  "results": [
    {
      "id": 654959,
      "title": "Pasta With Tuna",
      "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 511728,
      "title": "Pasta Margherita",
      "image": "https://spoonacular.com/recipeImages/511728-312x231.jpg",
      "imageType": "jpg"
    }
  ],
  "offset": 0,
  "number": 10,
  "totalResults": 42
}
```

&nbsp;

## 14. GET /recipes/random

Query parameters:

- `number`: Number of random recipes (optional, default 1)
- `tags`: Comma-separated tags (optional)

_Response (200 - OK)_

```json
{
  "recipes": [
    {
      "id": 654959,
      "title": "Pasta With Tuna",
      "image": "https://spoonacular.com/recipeImages/654959-556x370.jpg",
      "readyInMinutes": 45,
      "servings": 4,
      "summary": "Pasta With Tuna is a main course that serves 4. One portion of this dish contains approximately 22g of protein..."
    }
  ]
}
```

&nbsp;

## 15. GET /recipes/findByIngredients

Query parameters:

- `ingredients`: Comma-separated ingredients (required)
- `number`: Number of results (optional, default 5)

_Response (200 - OK)_

```json
[
  {
    "id": 654959,
    "title": "Pasta With Tuna",
    "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg",
    "usedIngredientCount": 3,
    "missedIngredientCount": 1,
    "missedIngredients": [
      {
        "id": 11529,
        "amount": 1,
        "unit": "cup",
        "name": "tomato"
      }
    ],
    "usedIngredients": [
      {
        "id": 10311529,
        "amount": 10,
        "unit": "",
        "name": "cherry tomato"
      }
    ]
  }
]
```

&nbsp;

## 16. GET /recipes/generateByNutrients

Query parameters:

- `minCarbs`: Minimum carbohydrates (optional)
- `maxCarbs`: Maximum carbohydrates (optional)
- `minProtein`: Minimum protein (optional)
- `maxProtein`: Maximum protein (optional)
- `minCalories`: Minimum calories (optional)
- `maxCalories`: Maximum calories (optional)
- `number`: Number of results (optional, default 5)

_Response (200 - OK)_

```json
[
  {
    "id": 654959,
    "title": "Pasta With Tuna",
    "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg",
    "calories": 522,
    "protein": 22,
    "fat": 18,
    "carbs": 65
  }
]
```

&nbsp;

## 17. GET /recipes/generateIngredientRecommendations

Query parameters:

- `ingredient`: Ingredient name (required)

_Response (200 - OK)_

```json
{
  "ingredient": "tomato",
  "recommendations": [
    {
      "name": "basil",
      "score": 0.94
    },
    {
      "name": "mozzarella",
      "score": 0.92
    }
  ]
}
```

&nbsp;

## 18. GET /recipes/mostRecent

_Response (200 - OK)_

```json
[
  {
    "id": 654959,
    "title": "Pasta With Tuna",
    "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg",
    "readyInMinutes": 45,
    "servings": 4
  },
  {
    "id": 511728,
    "title": "Pasta Margherita",
    "image": "https://spoonacular.com/recipeImages/511728-312x231.jpg",
    "readyInMinutes": 30,
    "servings": 4
  }
]
```

&nbsp;

## 19. GET /recipes/categories/:category

Request:

- params:
  - `category`: Category name (required)

_Response (200 - OK)_

```json
[
  {
    "id": 654959,
    "title": "Pasta With Tuna",
    "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg",
    "readyInMinutes": 45,
    "servings": 4
  },
  {
    "id": 511728,
    "title": "Pasta Margherita",
    "image": "https://spoonacular.com/recipeImages/511728-312x231.jpg",
    "readyInMinutes": 30,
    "servings": 4
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Category not found"
}
```

&nbsp;

## 20. GET /recipes/server/:id

Request:

- params:
  - `id`: Recipe ID in server database (required)

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "Pasta With Tuna",
  "image": "https://spoonacular.com/recipeImages/654959-556x370.jpg",
  "servings": 4,
  "readyInMinutes": 45,
  "summary": "Pasta With Tuna is a main course that serves 4. One portion of this dish contains approximately 22g of protein...",
  "instructions": "Cook the pasta according to package directions. In a large skillet, heat olive oil over medium heat...",
  "createdAt": "2024-02-13T12:00:00.000Z",
  "updatedAt": "2024-02-13T12:00:00.000Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found"
}
```

&nbsp;

## 21. GET /recipes/spoonacular/:id

Request:

- params:
  - `id`: Spoonacular Recipe ID (required)

_Response (200 - OK)_

```json
{
  "id": 654959,
  "title": "Pasta With Tuna",
  "image": "https://spoonacular.com/recipeImages/654959-556x370.jpg",
  "servings": 4,
  "readyInMinutes": 45,
  "cuisines": ["Italian", "Mediterranean"],
  "dishTypes": ["lunch", "main course", "dinner"],
  "summary": "Pasta With Tuna is a main course that serves 4. One portion of this dish contains approximately 22g of protein...",
  "instructions": "Cook the pasta according to package directions. In a large skillet, heat olive oil over medium heat...",
  "ingredients": [
    {
      "id": 10311529,
      "name": "cherry tomato",
      "amount": 10,
      "unit": ""
    },
    {
      "id": 11215,
      "amount": 1,
      "unit": "clove",
      "name": "garlic"
    }
  ],
  "nutrition": {
    "nutrients": [
      {
        "name": "Calories",
        "amount": 522.15,
        "unit": "kcal"
      },
      {
        "name": "Protein",
        "amount": 22.83,
        "unit": "g"
      }
    ]
  }
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
