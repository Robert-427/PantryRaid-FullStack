using Microsoft.AspNetCore.Mvc;
using PantryRaid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PantryRaid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;
        public RecipeController(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var recipes = _recipeRepository.GetAllRecipesWithIngredients();
            return Ok(recipes);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetByIngredient/{ingredientId}")]
        public IActionResult GetRecipe(int ingredientId)
        {
            var recipe = _recipeRepository.GetRecipeByIngredient(ingredientId);
            if(recipe == null)
            { return NotFound(); }
            return Ok(recipe);
        }

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
