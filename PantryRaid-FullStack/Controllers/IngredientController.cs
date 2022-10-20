using Microsoft.AspNetCore.Mvc;
using PantryRaid.Models;
using PantryRaid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PantryRaid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientRepository _ingredientRepository;
        public IngredientController(IIngredientRepository ingredientRepository)
        {
            _ingredientRepository = ingredientRepository;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public IActionResult GetAllIngredients()
        {
            var ingredients = _ingredientRepository.GetAllIngredients();
            return Ok(ingredients);
        }

        [HttpGet("GetByUser/{firebaseUserId}")]
        public IActionResult GetByUser(string firebaseUserId)
        {
            return Ok(_ingredientRepository.GetAllIngredientsByUser(firebaseUserId));
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
            _ingredientRepository.AddNewIngredient(ingredient);
            return CreatedAtAction("Get", new { id = ingredient.Id }, ingredient);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Ingredient ingredient)
        {
            if(id != ingredient.Id)
            {
                return BadRequest();
            }
            _ingredientRepository.UpdateIngredient(ingredient);
            return NoContent();
        }
    }
}
