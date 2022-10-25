using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PantryRaid.Repositories;

namespace PantryRaid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {
        private readonly IStateRepository _stateRepository;
        public StateController(IStateRepository stateRepository)
        {
            _stateRepository = stateRepository;
        }

        [HttpGet]
        public IActionResult GetAllStates()
        {
            var states = _stateRepository.GetAllStates();
            return Ok(states);
        }
    }
}
