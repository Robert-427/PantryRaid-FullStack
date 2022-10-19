using PantryRaid.Models;
using System.Collections.Generic;

namespace PantryRaid.Repositories
{
    public interface IIngredientRepository
    {
        public List<Ingredient> GetAllIngredients();
        public List<Ingredient> GetAllIngredientsByUser(string firebaseUserId);
        public Ingredient GetIngredientById(int id);
    }
}