using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PantryRaid.Models;
using PantryRaid.Utils;
using System.Collections.Generic;

namespace PantryRaid.Repositories
{
    public class RecipeRepository : BaseRepository, IRecipeRepository
    {
        public RecipeRepository(IConfiguration configuration) : base(configuration) { }
        public List<Recipe> GetAllRecipes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT	r.Id, r.Title, r.Description, r.ImageUrl, r.Website, 
								ri.Id AS RecipeIngredientId, ri.IngredientId, ri.RecipeId, ri.IsRequired, 
								i.Id AS IngredientsId, i.FoodGroupId, i.Name as Ingredient, 
								g.Id AS GroupId, g.Name AS FoodGroup
						FROM Recipe r
						LEFT JOIN RecipeIngredient ri ON ri.RecipeId = r.Id
						LEFT JOIN Ingredient i ON ri.IngredientId = i.Id
						LEFT JOIN FoodGroup g ON i.FoodGroupId = g.Id
						ORDER BY g.Id";

                    var reader = cmd.ExecuteReader();
                    var recipes = new List<Recipe>();
                    while (reader.Read())
                    {
                        recipes.Add(NewRecipeFromReader(reader));
                    };
                    reader.Close();
                    return recipes;

                    //using (SqlDataReader reader = cmd.ExecuteReader())
                    //{
                    //    Recipe recipe = null;
                    //    while (reader.Read())
                    //    {
                    //        if(recipe == null)
                    //        {
                    //            recipe = NewRecipeFromReader(reader);
                    //        }
                    //        if(DBUtils.IsNotDbNull(reader, "ri.Id"))
                    //        {
                    //            recipe.Ingredients.Add(new Ingredient()
                    //            {
                    //                Id = DBUtils.GetInt(reader, "IngredientsId"),
                    //                Name = DBUtils.GetString(reader, "Ingredient"),
                    //                FoodGroupId = DBUtils.GetInt(reader, "FoodGroupId"),
                    //                FoodGroup = new FoodGroup()
                    //                {
                    //                    Id = DBUtils.GetInt(reader, "FoodGroupId"),
                    //                    Name = DBUtils.GetString(reader, "FoodGroup")
                    //                }
                    //            });
                    //        }
                    //    }
                    //    reader.Close();
                    //    return recipe;
                    //}
                }
            }
        }
        private Recipe NewRecipeFromReader(SqlDataReader reader)
        {
            return new Recipe()
            {
                Id = DBUtils.GetInt(reader, "Id"),
                Description = DBUtils.GetString(reader, "Description"),
                Website = DBUtils.GetString(reader, "Website"),
                ImageUrl = DBUtils.GetString(reader, "ImageUrl"),
                Ingredients = new List<Ingredient>()
            };
        }
    }
}
