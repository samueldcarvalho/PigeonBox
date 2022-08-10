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
        /// Registra o usuário a partir dos dados de input
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("/user/register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserInputModel input)
        {
            CommandResponse<bool> response = await _mediatorHandler.SendCommand(new RegisterUserCommand(input.FirstName, input.LastName, input.Email, input.Username, input.Password));

            if (!response.Success)
                return BadRequest(JsonConvert.SerializeObject(response.ValidationResult.Errors));

            return Ok();
        }

        /// <summary>
        /// Obtém o usuário a partir do e-mail extraído do HttpContext, que por sua vez, é obtido no middleware de Autenticação
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("/user/get")]
        public async Task<ActionResult<UserConnectionViewModel>> GetUser()
        {
            var email = HttpContext.User.Identity.Name;

            if (string.IsNullOrWhiteSpace(email))
                return StatusCode(StatusCodes.Status500InternalServerError, null);

            var user = await _userQueries.GetUserByEmail(email);

            if(user == null)
                return StatusCode(StatusCodes.Status400BadRequest, null);

            return Ok(user);
        }

        /// <summary>
        /// Obtém todos os contatos do servidor, flagando os onlines e offlines
        /// </summary>
        /// <returns></returns>
        [HttpGet("/contacts/get/all")]
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
