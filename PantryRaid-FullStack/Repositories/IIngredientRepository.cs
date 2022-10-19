using PantryRaid.Models;
using System.Collections.Generic;

namespace PantryRaid.Repositories
{
    public interface IIngredientRepository
    {
        public List<Ingredient> GetAllIngredients();
        public List<Ingredient> GetAllIngredientsByUser(string firebaseUserId);
        public List<Ingredient> GetIngredientsByRecipe(int recipeId);
        public Ingredient GetIngredientById(int id);
    }
}