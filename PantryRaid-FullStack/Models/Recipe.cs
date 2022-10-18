using System.ComponentModel.DataAnnotations;

namespace PantryRaid_FullStack.Models
{
    public class Recipe
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string Website { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
