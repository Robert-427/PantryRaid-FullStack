using System.ComponentModel.DataAnnotations;

namespace PantryRaid.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int StateId { get; set; }
        public State State { get; set; }
        public int ZipCode { get; set; }

        [Required]
        public bool IsAdmin { get; set; }
        public string FullName { get { return $"{FirstName} {LastName}";}}
    }
}
