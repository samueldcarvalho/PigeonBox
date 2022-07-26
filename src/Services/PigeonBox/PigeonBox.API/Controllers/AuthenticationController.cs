using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PigeonBox.Application.Models.View;
using PigeonBox.Application.Queries;
using System.Threading.Tasks;

namespace PigeonBox.API.Controllers
{
    [Route("api/v1/authentication")]
    public class AuthenticationController : Controller
    {
        private readonly IUserQuery _userQuery;

        public AuthenticationController(IUserQuery userQuery)
        {
            _userQuery = userQuery;
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

            return await _userQuery.GetUserByEmail(email);
        }
    }
}
