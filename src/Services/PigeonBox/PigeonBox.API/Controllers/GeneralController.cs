using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace PigeonBox.API.Controllers
{
    [Route("/api/v1/[controller]")]
    [ApiController]
    public class GeneralController : ControllerBase
    {
        [HttpGet("check")]
        public ActionResult<string> Check()
        {
            return Ok($"API Status: Online \nAt: { DateTime.Now }");
        }
    }
}
