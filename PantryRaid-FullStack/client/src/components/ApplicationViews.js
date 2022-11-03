import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { MyPantry } from "./ingredients/MyPantry";
import { AllRecipes } from "./recipes/AllRecipeList";
import { RecipeDetails } from "./recipes/RecipeDetails";
import { AllIngredients } from "./ingredients/AllIngredientsList";
import { RecipeForm } from "./recipes/RecipeForm";
import { RecipeEditForm } from "./recipes/EditRecipeForm";
import { EditMyIngredients } from "./ingredients/EditMyIngredients";
import { EditIngredient } from "./ingredients/EditIngredient";

export default function ApplicationViews({ isLoggedIn, isAdmin }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <MyPantry /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="MyPantry" element={isLoggedIn ? <MyPantry /> : <Navigate to="/login" />} />
          <Route path="myIngredients/edit" element={isLoggedIn ? <EditMyIngredients /> : <Navigate to="/login" />} />
          <Route path="Ingredients" element={isLoggedIn ? <AllIngredients isAdmin={isAdmin} /> : <Navigate to="/login" />} />
          <Route path="Ingredients/edit/:ingredientId" element={isLoggedIn ? <EditIngredient /> : <Navigate to="/login" />} />
          <Route path="Recipes" element={isLoggedIn ? <AllRecipes /> : <Navigate to="/login" />} />
          <Route path="Recipes/details/:recipeId" element={isLoggedIn ? <RecipeDetails isAdmin={isAdmin} /> : <Navigate to="/login" />} />
          <Route path="Recipes/new" element={isLoggedIn ? <RecipeForm /> : <Navigate to="/login" />} />
          <Route path="Recipes/Edit/:recipeId" element={isLoggedIn ? <RecipeEditForm /> : <Navigate to="/login" />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
}
