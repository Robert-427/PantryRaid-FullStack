using PantryRaid.Models;
using System.Collections.Generic;

namespace PantryRaid.Repositories
{
    public interface IRecipeRepository
    {
        public List<Recipe> GetAllRecipesWithIngredients();
        public Recipe GetRecipeByIngredient(int ingredientId);
        public Recipe GetRecipeById(int recipeId);
        public void AddNewRecipe(Recipe recipe);
        public void UpdateRecipe(Recipe recipe);
        public void DeleteRecipe(int id);
    }
}