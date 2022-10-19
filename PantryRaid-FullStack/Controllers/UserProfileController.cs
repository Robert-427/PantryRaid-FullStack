using Microsoft.AspNetCore.Mvc;
using PantryRaid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PantryRaid.Controllers
{
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

        // GET: api/<ValuesController>
        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            var user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            { return NotFound(); }
            return Ok(user);
        }

        // GET api/<ValuesController>/5
        //[HttpGet("{id}")]
        //public string GetUserById(int id)
        //{
        //    return "value";
        //}

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
