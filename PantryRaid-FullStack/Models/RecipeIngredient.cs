using System.ComponentModel.DataAnnotations;

namespace PantryRaid_FullStack.Models
{
    public class RecipeIngredient
    {
        public int Id { get; set; }
        [Required]
        public int IngredientId { get; set; }
        [Required]
        public int RecipeId { get; set; }
        [Required]
        public bool IsRequired { get; set; }
    }
}
