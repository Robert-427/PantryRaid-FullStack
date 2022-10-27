using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PantryRaid.Models;
using PantryRaid.Repositories;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PantryRaid.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientRepository _ingredientRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public IngredientController(
            IIngredientRepository ingredientRepository,
            IUserProfileRepository userProfileRepository)
        {
            _ingredientRepository = ingredientRepository;
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public IActionResult GetAllIngredients()
        {
            var ingredients = _ingredientRepository.GetAllIngredients();
            return Ok(ingredients);
        }

        [HttpGet("GetByUser")]
        public IActionResult GetByUser()
        {
            var currentUser = GetCurrentUserProfile();
            return Ok(_ingredientRepository.GetAllIngredientsByUser(currentUser.FirebaseUserId));
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_ingredientRepository.GetIngredientById(id));
        }

        [HttpGet("GetByRecipe/{recipeId}")]
        public IActionResult GetByRecipe(int recipeId)
        {
            var ingredients = _ingredientRepository.GetIngredientsByRecipe(recipeId);
            {
                if(ingredients == null) return NotFound();
                return Ok(ingredients);
            }
        }

        // POST api/<ValuesController>
        [HttpPost]
        public IActionResult Post(Ingredient ingredient)
        {
            //var currentUserProfile = GetCurrentUserProfile();
            //if(currentUserProfile.IsAdmin == false)
            //{
            //    return Unauthorized();
            //}
            _ingredientRepository.AddNewIngredient(ingredient);
            return CreatedAtAction("Get", new { id = ingredient.Id }, ingredient);
        }

        [HttpPost("AddUserIngredient/{ingredientId})")]
        public IActionResult Post(int ingredientId)
        {
            var currentUser = GetCurrentUserProfile();
            _ingredientRepository.AddUserIngredient(currentUser.Id, ingredientId);
            return NoContent();
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Ingredient ingredient)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if(currentUserProfile.IsAdmin == false)
            {
                return Unauthorized();
            }
            if(id != ingredient.Id)
            {
                return BadRequest();
            }
            _ingredientRepository.UpdateIngredient(ingredient);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
