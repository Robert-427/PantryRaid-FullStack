using System.ComponentModel.DataAnnotations;

namespace PantryRaid_FullStack.Models
{
    public class FoodGroup
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
