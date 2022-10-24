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
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public RecipeController(
            IRecipeRepository recipeRepository,
            IUserProfileRepository userProfileRepsoitory)
        {
            _recipeRepository = recipeRepository;
            _userProfileRepository = userProfileRepsoitory;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_recipeRepository.GetAllRecipesWithIngredients());
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetByIngredient/{ingredientId}")]
        public IActionResult GetRecipeByIngredient(int ingredientId)
        {
            var recipe = _recipeRepository.GetRecipeByIngredient(ingredientId);
            if(recipe == null)
            { return NotFound(); }
            return Ok(recipe);
        }

        [HttpGet("GetByRecipe/{recipeId}")]
        public IActionResult GetRecipe(int recipeId)
        {
            var recipe = _recipeRepository.GetRecipeById(recipeId);
            if(recipe == null)
            { return NotFound(); }
            return Ok(recipe);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public IActionResult Post(Recipe recipe)
        {
            _recipeRepository.AddNewRecipe(recipe);
            return CreatedAtAction("Get", new {id = recipe.Id}, recipe);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Recipe recipe)
        {
            if(id != recipe.Id)
            {
                return BadRequest();
            }
            _recipeRepository.UpdateRecipe(recipe);
            return NoContent();
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _recipeRepository.DeleteRecipe(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
