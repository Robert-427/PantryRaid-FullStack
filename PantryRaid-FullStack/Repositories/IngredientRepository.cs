using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using PantryRaid.Models;
using PantryRaid.Utils;

namespace PantryRaid.Repositories
{
    public class IngredientRepository : BaseRepository, IIngredientRepository
    {
        public IngredientRepository(IConfiguration configuration) : base(configuration) { }
        public List<Ingredient> GetAllIngredients()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.Id, i.Name, i.FoodGroupId, g.id, g.Name AS FoodGroupName
                        FROM Ingredient i
                        LEFT JOIN FoodGroup g ON i.FoodGroupId = g.Id
                        ORDER BY g.Id";

                    var reader = cmd.ExecuteReader();

                    var ingredients = new List<Ingredient>();

                    while (reader.Read())
                    {
                        ingredients.Add(NewIngredientFromReader(reader));
                    };
                    reader.Close();
                    return ingredients;
                }
            }
        }
        public List<Ingredient> GetAllIngredientsByUser(string firebaseUserId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.Id, i.Name, i.FoodGroupId, g.id, g.Name AS FoodGroupName, u.id AS UserId
                        FROM Ingredient i
                        JOIN FoodGroup g ON i.FoodGroupId = g.id
                        LEFT JOIN UserIngredient ui ON ui.IngredientId = i.Id
                        LEFT JOIN UserProfile u ON ui.UserProfileId = u.id
                        WHERE u.firebaseUserId = @firebaseUserId
                        ORDER BY g.Id";

                    DBUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    var reader = cmd.ExecuteReader();

                    var ingredients = new List<Ingredient>();

                    while (reader.Read())
                    {
                        ingredients.Add(NewIngredientFromReader(reader));
                    }
                    reader.Close();
                    return ingredients;
                }
            }
        }
        public List<Ingredient> GetIngredientsByRecipe(int recipeId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.Id, i.Name, i.FoodGroupId, g.id, g.Name AS FoodGroupName, r.Id AS RecipeId
                        FROM Ingredient i
                        JOIN FoodGroup g ON i.FoodGroupId = g.id
                        JOIN RecipeIngredient ri ON ri.IngredientId = i.Id
                        JOIN Recipe r ON ri.RecipeId = r.Id
                        WHERE r.id = @recipeId
                        ORDER BY g.Id";

                    DBUtils.AddParameter(cmd, "@recipeId", recipeId);

                    var reader = cmd.ExecuteReader();

                    var ingredients = new List<Ingredient>();

                    while (reader.Read())
                    {
                        ingredients.Add(NewIngredientFromReader(reader));
                    };
                    reader.Close();
                    return ingredients;
                }
            }
        }
        public List<FoodGroup> GetAllFoodGroupsForIngredients()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM FoodGroup";

                    var reader = cmd.ExecuteReader();
                    var foodGroups = new List<FoodGroup>();
                    while(reader.Read())
                    {
                        foodGroups.Add(NewFoodGroupFromReader(reader));
                    };
                    reader.Close();
                    return foodGroups;
                }
            }
        }
        public Ingredient GetIngredientById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.Id, i.Name, i.FoodGroupId, g.id, g.Name AS FoodGroupName
                        FROM Ingredient i
                        LEFT JOIN FoodGroup g ON i.FoodGroupId = g.id
                        WHERE i.ID = @id";

                    DBUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Ingredient ingredient = null;
                        if (reader.Read())
                        {
                            ingredient = NewIngredientFromReader(reader);
                        }
                        reader.Close();
                        return ingredient;
                    }
                }
            }
        }
        public void AddNewIngredient(Ingredient ingredient)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Ingredient (Name, FoodGroupId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @FoodGroupId)";

                    DBUtils.AddParameter(cmd, "@Name", ingredient.Name);
                    DBUtils.AddParameter(cmd, "@FoodGroupId", ingredient.FoodGroupId);

                    ingredient.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void AddUserIngredient(int userId, int ingredientId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserIngredient (UserProfileId, IngredientId, Quantity)
                        VALUES (@userProfileId, @ingredientId, @quantity)";

                    DBUtils.AddParameter(cmd, "@userProfileId", userId);
                    DBUtils.AddParameter(cmd, "@ingredientId", ingredientId);
                    DBUtils.AddParameter(cmd, "@quantity", 1);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void UpdateIngredient(Ingredient ingredient)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Ingredient
                        SET Name = @Name,
                            FoodGroupId = @FoodGroupId
                        WHERE Id = @Id";

                    DBUtils.AddParameter(cmd, "@Id", ingredient.Id);
                    DBUtils.AddParameter(cmd, "@Name", ingredient.Name);
                    DBUtils.AddParameter(cmd, "FoodGroupId", ingredient.FoodGroupId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void UpdateUsersIngredients(int userId, List<Ingredient> ingredients)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM UserIngredient WHERE UserProfileId = @UserProfileId";
                    DBUtils.AddParameter(cmd, "@UserProfileId", userId);
                    cmd.ExecuteNonQuery();
                }
                foreach (var ingredient in ingredients)
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                            INSERT INTO UserIngredient (UserProfileId, IngredientId, Quantity)
                            VALUES (@UserProfileId, @ingredientId, @quantity)";

                        DBUtils.AddParameter(cmd, "@UserProfileId", userId);
                        DBUtils.AddParameter(cmd, "@ingredientId", ingredient.Id);
                        DBUtils.AddParameter(cmd, "@quantity", 10);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
        private Ingredient NewIngredientFromReader(SqlDataReader reader)
        {
            return new Ingredient()
            {
                Id = DBUtils.GetInt(reader, "Id"),
                Name = DBUtils.GetString(reader, "Name"),
                FoodGroupId = DBUtils.GetInt(reader, "FoodGroupId"),
                FoodGroup = new FoodGroup()
                {
                    Id = DBUtils.GetInt(reader, "FoodGroupId"),
                    Name = DBUtils.GetString(reader, "FoodGroupName")
                }
            };
        }
        private FoodGroup NewFoodGroupFromReader(SqlDataReader reader)
        {
            return new FoodGroup()
            {
                Id = DBUtils.GetInt(reader, "Id"),
                Name = DBUtils.GetString(reader, "Name")
            };
        }
    }
}
