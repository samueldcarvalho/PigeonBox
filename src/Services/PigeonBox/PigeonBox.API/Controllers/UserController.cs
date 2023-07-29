using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PigeonBox.Application.Commands.Users;
using PigeonBox.Application.Interfaces;
using PigeonBox.Application.Models.Input;
using PigeonBox.Application.Models.View;
using PigeonBox.Application.Queries;
using PigeonBox.Core.CQRS;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PigeonBox.API.Controllers
{
    [Route("/api/v1/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserQueries _userQueries;
        private readonly IMediatorHandler _mediatorHandler;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserQueries userQuery, IMediatorHandler mediatorHandler, ILogger<UserController> logger)
        {
            _userQueries = userQuery;
            _mediatorHandler = mediatorHandler;
            _logger = logger;
        }

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserInputModel input)
        {
            CommandResponse<bool> response = await _mediatorHandler.SendCommand(new RegisterUserCommand(input.FirstName, input.LastName, input.Email, input.Username, input.Password));

            if (!response.Success)
                return BadRequest(JsonConvert.SerializeObject(response.ValidationResult.Errors));

            return Ok();
        }

        /// <summary>
        /// Get logged User
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("get")]
        public async Task<ActionResult<UserConnectionViewModel>> GetUser()
        {
            var userIdClaim = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return StatusCode(StatusCodes.Status400BadRequest, null);

            var user = await _userQueries.GetUserById(int.Parse(userIdClaim.Value));

            if(user == null)
                return StatusCode(StatusCodes.Status400BadRequest, null);

            return Ok(user);
        }

        /// <summary>
        /// Get all contacts
        /// </summary>
        /// <returns></returns>
        [HttpGet("contacts")]
        public async Task<ActionResult<IEnumerable<ContactViewModel>>> GetAllContacts()
        {
            var contacts = await _userQueries.GetAllContacts();

            if(contacts == null)
            {
                _logger.LogInformation("No contacts in the server");
                return Ok(null);
            }

            return Ok(contacts);
        }
    }
}
