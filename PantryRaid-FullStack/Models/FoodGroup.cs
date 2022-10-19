using System.ComponentModel.DataAnnotations;

namespace PantryRaid.Models
{
    public class FoodGroup
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
