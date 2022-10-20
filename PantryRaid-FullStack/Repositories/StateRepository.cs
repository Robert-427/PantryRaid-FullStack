using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using PantryRaid.Models;
using PantryRaid.Utils;

namespace PantryRaid.Repositories
{
    public class StateRepository : BaseRepository, IStateRepository
    {
        public StateRepository(IConfiguration configuration) : base(configuration) { }
        public List<State> GetAllStates()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name
                        FROM State";

                    var reader = cmd.ExecuteReader();

                    var states = new List<State>();

                    while (reader.Read())
                    {
                        states.Add(NewStateFromReader(reader));
                    }
                    reader.Close();
                    return states;
                }
            }
        }
        private State NewStateFromReader(SqlDataReader reader)
        {
            return new State()
            {
                Id = DBUtils.GetInt(reader, "id"),
                Name = DBUtils.GetString(reader, "name")
            };
        }
    }
}
