import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicHome from "./pages/PublicHome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Nutrition from "./pages/Nutrition";
import MyRecipesPage from "./pages/MyRecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeFullDetail from "./pages/RecipeFullDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/public" element={<PublicHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="categories/:category" element={<Category />} />
          <Route path="nutrition" element={<Nutrition />} />
          <Route path="search" element={<Search />} />

          <Route path="recipeDetail/:id" element={<RecipeDetail />} />
          <Route path="recipeFullDetail/:id" element={<RecipeFullDetail />} />

          <Route path="saved-recipe" element={<MyRecipesPage />} />
          <Route
            path="saved-recipe-detail/:id"
            element={<h1>Saved Recipe Detail</h1>}
          />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
