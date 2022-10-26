using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PantryRaid.Models;
using PantryRaid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PantryRaid.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userProfileRepository.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            var user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: api/<ValuesController>
        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            { 
                return NotFound(); 
            }
            return Ok();
        }

        // POST api/<ValuesController>
        [HttpPost]
        public IActionResult Register(UserProfile user)
        {
            user.IsAdmin = false;
            _userProfileRepository.AddNewUser(user);
            return CreatedAtAction(
                nameof(GetUserProfile), new { firebaseUserId = user.FirebaseUserId }, user);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile user)
        {
            if(id != user.Id)
            {
                return BadRequest();
            }
            _userProfileRepository.UpdateUser(user);
            return NoContent();
        }
    }
}
