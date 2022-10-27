using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PantryRaid.Models;
using PantryRaid.Utils;
using System.Collections.Generic;
using System.Linq;

namespace PantryRaid.Repositories
{
    public class RecipeRepository : BaseRepository, IRecipeRepository
    {
        public RecipeRepository(IConfiguration configuration) : base(configuration) { }
        public List<Recipe> GetAllRecipesWithIngredients()
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

                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var recipes = new List<Recipe>();
                        while (reader.Read())
                        {
                            var recipeId = DBUtils.GetInt(reader, "Id");

                            var exisitingRecipe = recipes.FirstOrDefault(p => p.Id == recipeId);
                            if(exisitingRecipe == null)
                            {
                                exisitingRecipe = new Recipe()
                                {
                                    Id = DBUtils.GetInt(reader, "Id"),
                                    Title = DBUtils.GetString(reader, "Title"),
                                    Description = DBUtils.GetString(reader, "Description"),
                                    Website = DBUtils.GetString(reader, "Website"),
                                    ImageUrl = DBUtils.GetString(reader, "ImageUrl"),
                                    Ingredients = new List<Ingredient>()
                                };
                                recipes.Add(exisitingRecipe);
                            }
                            if(DBUtils.IsNotDbNull(reader, "RecipeIngredientId"))
                            {
                                exisitingRecipe.Ingredients.Add(new Ingredient()
                                {
                                    Id = DBUtils.GetInt(reader, "IngredientsId"),
                                    Name = DBUtils.GetString(reader,"Ingredient"),
                                    FoodGroupId = DBUtils.GetInt(reader, "FoodGroupId"),
                                    FoodGroup = new FoodGroup()
                                    {
                                        Id = DBUtils.GetInt(reader,"GroupId"),
                                        Name = DBUtils.GetString(reader,"FoodGroup")
                                    }
                                });
                            }
                        };
                        reader.Close();
                        return recipes;
                    }
                }
            }
        }
        public List<Recipe> GetAllRecipesByIngredient(int ingredientId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
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
                        WHERE i.Id = @id";

                    DBUtils.AddParameter(cmd, "@id", ingredientId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var recipes = new List<Recipe>();
                        while (reader.Read())
                        {
                            var recipeId = DBUtils.GetInt(reader, "Id");

                            var exisitingRecipe = recipes.FirstOrDefault(r => r.Id == recipeId);
                            if (exisitingRecipe == null)
                            {
                                exisitingRecipe = new Recipe()
                                {
                                    Id = DBUtils.GetInt(reader, "Id"),
                                    Title = DBUtils.GetString(reader, "Title"),
                                    Description = DBUtils.GetString(reader, "Description"),
                                    Website = DBUtils.GetString(reader, "Website"),
                                    ImageUrl = DBUtils.GetString(reader, "ImageUrl"),
                                    Ingredients = new List<Ingredient>()
                                };
                                recipes.Add(exisitingRecipe);
                            }
                        };
                        reader.Close();
                        return recipes;
                    }
                }
            }
        }
      
        public Recipe GetRecipeById(int recipeId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
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
                        WHERE r.Id = @id
						ORDER BY g.Id";

                    DBUtils.AddParameter(cmd, "@id", recipeId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Recipe recipe = null;
                        while(reader.Read())
                        {
                            if (recipe == null)
                            {
                                recipe = NewRecipeFromReader(reader);
                            }
                            if (DBUtils.IsNotDbNull(reader, "RecipeIngredientId"))
                            {
                                recipe.Ingredients.Add(new Ingredient()
                                {
                                    Id = DBUtils.GetInt(reader, "IngredientsId"),
                                    Name = DBUtils.GetString(reader, "Ingredient"),
                                    FoodGroupId = DBUtils.GetInt(reader, "FoodGroupId"),
                                    FoodGroup = new FoodGroup()
                                    {
                                        Id = DBUtils.GetInt(reader, "GroupId"),
                                        Name = DBUtils.GetString(reader, "FoodGroup")
                                    }
                                });
                            }
                        }
                        return recipe;
                    }
                }
            }
        }
        public void AddNewRecipe(Recipe recipe)
        {
            using(var conn=Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Recipe (Title, Description, Website, ImageUrl)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Description, @Website, @ImageUrl)";

                    DBUtils.AddParameter(cmd, "@Title", recipe.Title);
                    DBUtils.AddParameter(cmd, "@Description", recipe.Description);
                    DBUtils.AddParameter(cmd, "@Website", recipe.Website);
                    DBUtils.AddParameter(cmd, "@ImageUrl", recipe.ImageUrl);

                    recipe.Id = (int)cmd.ExecuteScalar();

                    AddNewRecipeIngredient(recipe.Id, recipe.Ingredients);
                }
            }
        }
        private void AddNewRecipeIngredient(int recipeId, List<Ingredient> ingredients)
        {
            foreach(var ingredient in ingredients)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                            INSERT INTO RecipeIngredient (RecipeId, IngredientId, IsRequired)
                            VALUES (@recipeId, @ingredientId, @isRequired)";

                        DBUtils.AddParameter(cmd, "@recipeId", recipeId);
                        DBUtils.AddParameter(cmd, "@ingredientId", ingredient.Id);
                        DBUtils.AddParameter(cmd, "@isRequired", 1);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
        public void UpdateRecipe(Recipe recipe)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Recipe
                        SET Title = @Title,
                            Description = @Description,
                            Website = @Website,
                            ImageUrl = @ImageUrl
                        WHERE Id = @Id";

                    DBUtils.AddParameter(cmd, "@Title", recipe.Title);
                    DBUtils.AddParameter(cmd, "@Description", recipe.Description);
                    DBUtils.AddParameter(cmd, "@Website", recipe.Website);
                    DBUtils.AddParameter(cmd, "@ImageUrl", recipe.ImageUrl);

                    DBUtils.AddParameter(cmd, "@id", recipe.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteRecipe(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Recipe WHERE Id = @id";
                    DBUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        private Recipe NewRecipeFromReader(SqlDataReader reader)
        {
            return new Recipe()
            {
                Id = DBUtils.GetInt(reader, "Id"),
                Title = DBUtils.GetString(reader, "Title"),
                Description = DBUtils.GetString(reader, "Description"),
                Website = DBUtils.GetString(reader, "Website"),
                ImageUrl = DBUtils.GetString(reader, "ImageUrl"),
                Ingredients = new List<Ingredient>()
            };
        }
    }
}
