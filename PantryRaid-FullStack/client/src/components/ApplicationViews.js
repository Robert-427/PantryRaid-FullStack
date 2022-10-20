import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { MyIngredientsList } from "./ingredients/MyIngredientsList";
import { AllRecipes } from "./recipes/AllRecipeList";
import { RecipeDetails } from "./recipes/RecipeDetails";


export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="myIngredients" element={<MyIngredientsList />} />
          <Route path="Recipes" element={<AllRecipes />} />
          <Route path="Recipes/details/:recipeId/" element={<RecipeDetails />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
}
