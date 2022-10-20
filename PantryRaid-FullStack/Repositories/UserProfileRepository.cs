using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using PantryRaid.Models;
using PantryRaid.Utils;

namespace PantryRaid.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  u.Id, u.FirebaseUserId, u.DisplayName, u.Email, u.FirstName, u.LastName, 
                                u.Address, u.City, u.StateId, u.ZipCode, u.IsAdmin, s.Name AS State
                        FROM UserProfile u
                        JOIN State s ON u.StateId = s.id
                        WHERE u.FirebaseUserId = @firebaseUserId";

                    DBUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    UserProfile user = null;

                    var reader = cmd.ExecuteReader();
                    if(reader.Read())
                    {
                        user = NewUserFromReader(reader);
                    }
                    reader.Close();
                    return user;
                }
            }
        }
        public List<UserProfile> GetAllUsers()
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  u.Id, u.FirebaseUserId, u.DisplayName, u.Email, u.FirstName, u.LastName, 
                                u.Address, u.City, u.StateId, u.ZipCode, u.IsAdmin, s.Name AS State
                        FROM UserProfile u
                        JOIN State s ON u.StateId = s.id";

                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<UserProfile>();
                        while (reader.Read())
                        {
                            users.Add(NewUserFromReader(reader));
                        }
                        reader.Close();
                        return users;
                    }
                }
            }
        }
        public void AddNewUser(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERTED INTO UserProfile (FirebaseUserId, DisplayName, Email, FirstName, LastName, 
                                                Address, City, StateId, ZipCode, IsAdmin)
                        OUTPUT INSERTED.ID
                        VALUES (@FirebaseUserId, @DisplayName, @Email, @FirstName, @LastName, 
                                @Address, @City, @StateId, @ZipCode, @IsAdmin)";

                    DBUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DBUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DBUtils.AddParameter(cmd, "@Email", user.Email);
                    DBUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DBUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DBUtils.AddParameter(cmd, "@Address", user.Address);
                    DBUtils.AddParameter(cmd, "@City", user.City);
                    DBUtils.AddParameter(cmd, "@StateId", user.StateId);
                    DBUtils.AddParameter(cmd, "@ZipCode", user.ZipCode);
                    DBUtils.AddParameter(cmd, "IsAdmin", user.IsAdmin);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void UpdateUser(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                        SET FirebaseUserId = @FirebaseUserId,
                            DisplayName = @DisplayName,
                            Email = @Email,
                            FirstName = @FirstName,
                            LastName = @LastName,
                            Address = @Address,
                            City = @City,
                            StateId = @StateId,
                            ZipCode =  @ZipCode,
                            IsAdmin = @IsAdmin
                        WHERE Id = @Id";

                    DBUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DBUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DBUtils.AddParameter(cmd, "@Email", user.Email);
                    DBUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DBUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DBUtils.AddParameter(cmd, "@Address", user.Address);
                    DBUtils.AddParameter(cmd, "@City", user.City);
                    DBUtils.AddParameter(cmd, "@StateId", user.StateId);
                    DBUtils.AddParameter(cmd, "@ZipCode", user.ZipCode);
                    DBUtils.AddParameter(cmd, "IsAdmin", user.IsAdmin);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        private UserProfile NewUserFromReader(SqlDataReader reader)
        {
            return new UserProfile()
            {
                Id = DBUtils.GetInt(reader, "Id"),
                FirebaseUserId = DBUtils.GetString(reader, "FirebaseUserId"),
                DisplayName = DBUtils.GetString(reader, "DisplayName"),
                Email = DBUtils.GetString(reader, "Email"),
                FirstName = DBUtils.GetString(reader, "FirstName"),
                LastName = DBUtils.GetString(reader, "LastName"),
                Address = DBUtils.GetString(reader, "Address"),
                City = DBUtils.GetString(reader, "City"),
                StateId = DBUtils.GetInt(reader, "StateId"),
                ZipCode = DBUtils.GetInt(reader, "ZipCode"),
                IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin")),
                State = new State()
                {
                    Id = DBUtils.GetInt(reader, "StateId"),
                    Name = DBUtils.GetString(reader, "State")
                }
            };
        }
    }
}
