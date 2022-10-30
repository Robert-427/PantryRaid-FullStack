using PantryRaid.Models;
using System.Collections.Generic;

namespace PantryRaid.Repositories
{
    public interface IIngredientRepository
    {
        public List<Ingredient> GetAllIngredients();
        public List<Ingredient> GetAllIngredientsByUser(string firebaseUserId);
        public List<Ingredient> GetIngredientsByRecipe(int recipeId);
        public List<FoodGroup> GetAllFoodGroupsForIngredients();
        public Ingredient GetIngredientById(int id);
        public void AddNewIngredient(Ingredient ingredient);
        public void AddUserIngredient(int userId, int ingredientId);
        public void UpdateIngredient(Ingredient ingredient);
        public void UpdateUsersIngredients(int userId, List<Ingredient> ingredients);
    }
}