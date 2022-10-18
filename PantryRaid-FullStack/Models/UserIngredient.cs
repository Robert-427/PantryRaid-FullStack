using System.ComponentModel.DataAnnotations;

namespace PantryRaid_FullStack.Models
{
    public class UserIngredient
    {
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        [Required]
        public int IngredientId { get; set; }
        public int Quantity { get; set; }
    }
}
