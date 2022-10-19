using System.ComponentModel.DataAnnotations;

namespace PantryRaid.Models
{
    public class State
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
