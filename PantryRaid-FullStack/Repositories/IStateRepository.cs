using PantryRaid.Models;
using System.Collections.Generic;

namespace PantryRaid.Repositories
{
    public interface IStateRepository
    {
        List<State> GetAllStates();
    }
}