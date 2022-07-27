using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PigeonBox.Application.Commands.Users;
using PigeonBox.Application.Models.Input;
using PigeonBox.Application.Models.View;
using PigeonBox.Application.Queries;
using PigeonBox.Core.CQRS;
using System.Threading.Tasks;

namespace PigeonBox.API.Controllers
{
    [Route("/api/v1/authentication")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly IUserQuery _userQuery;
        private readonly IMediatorHandler _mediatorHandler;

        public AuthenticationController(IUserQuery userQuery, IMediatorHandler mediatorHandler)
        {
            _userQuery = userQuery;
            _mediatorHandler = mediatorHandler;
        }

        /// <summary>
        /// Registra o usuário a partir dos dados de input
        /// </summary>
        /// <param name=""></param>
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

            var user = await _userQuery.GetUserByEmail(email);

            if(user == null)
                return StatusCode(StatusCodes.Status400BadRequest, null);

            return Ok(user);
        }
    }
}
