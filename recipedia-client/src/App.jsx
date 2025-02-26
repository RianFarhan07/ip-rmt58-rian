import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicHome from "./pages/PublicHome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Home from "./pages/Home";

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
          <Route path="searchByIngredients" element={<h1>Search</h1>} />
          <Route
            path="nutrition-analysis/:id"
            element={<h1>Nutrition analysis</h1>}
          />

          <Route path="recipeDetail/:id" element={<h1>Recipe</h1>} />

          <Route path="saved-recipe" element={<h1>Saved Recipe</h1>} />
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
