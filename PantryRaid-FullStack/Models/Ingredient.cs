using System.ComponentModel.DataAnnotations;

namespace PantryRaid.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int FoodGroupId { get; set; }
        public FoodGroup FoodGroup { get; set; }
    }
}
