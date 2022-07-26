using Microsoft.AspNetCore.Mvc;

namespace PigeonBox.API.Controllers
{
    [Route("api/v1/authentication")]
    public class AuthenticationController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }
    }
}
