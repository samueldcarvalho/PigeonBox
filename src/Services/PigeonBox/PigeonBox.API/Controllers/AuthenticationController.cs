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

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public async Task<ActionResult<UserConnectionViewModel>> GetUser()
        {
            var email = HttpContext.User.Identity.Name;

            return await _userQuery.GetUserByEmail(email);
        }
    }
}
