using System.ComponentModel.DataAnnotations;

namespace PantryRaid.Models
{
    public class UserIngredient
    {
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public UserProfile User { get; set; }
        [Required]
        public int IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }
        public int Quantity { get; set; }
    }
}
