using Microsoft.AspNetCore.Mvc;

namespace PigeonBox.API.Controllers
{
    [Route("/api/v1/contact")]
    [ApiController]
    public class ContactController : Controller
    {
        public IActionResult GetAllContacts()
        {
            return View();
        }
    }
}
