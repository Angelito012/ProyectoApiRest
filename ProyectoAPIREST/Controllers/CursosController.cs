using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProyectoAPIREST.Controllers
{
    [Route("api/[controller]")]
  
    [ApiController]
    public class CursosController : Controller
    {

        [HttpGet]
        public IActionResult Get()
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Curso = (from d in db.Cursos
                             where d.Estado == "A"
                              select d).ToList();

                return Ok(Curso);
            }
        }
    }
}
