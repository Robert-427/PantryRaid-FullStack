using PantryRaid.Models;
using System.Collections.Generic;

namespace PantryRaid.Repositories
{
    public interface IRecipeRepository
    {
        public List<Recipe> GetAllRecipesWithIngredients();
        public Recipe GetRecipeByIngredient(int ingredientId);
    }
}