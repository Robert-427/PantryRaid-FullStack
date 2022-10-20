using PantryRaid.Models;
using System.Collections.Generic;

namespace PantryRaid.Repositories
{
    public interface IUserProfileRepository
    {
        public UserProfile GetByFirebaseUserId(string firebaseUserId);
        public List<UserProfile> GetAllUsers();
        public void AddNewUser(UserProfile user);
        public void UpdateUser(UserProfile user);
    }
}