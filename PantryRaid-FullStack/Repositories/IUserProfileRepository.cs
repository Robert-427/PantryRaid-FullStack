using PantryRaid_FullStack.Models;

namespace PantryRaid_FullStack.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}