using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using PantryRaid_FullStack.Models;
using PantryRaid_FullStack.Utils;

namespace PantryRaid_FullStack.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            UserProfile user = null;
            return user;
        }
    }
}
