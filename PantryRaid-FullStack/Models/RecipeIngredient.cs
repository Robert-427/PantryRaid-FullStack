using System.ComponentModel.DataAnnotations;

namespace PantryRaid.Models
{
    public class RecipeIngredient
    {
        public int Id { get; set; }
        [Required]
        public int IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }
        [Required]
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
        [Required]
        public bool IsRequired { get; set; }
    }
}
