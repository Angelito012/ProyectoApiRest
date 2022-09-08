using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ProyectoAPIREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminPantallaController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Usuario = (from d in db.Usuarios
                               where d.Rol != "Administrador"
                               select d).ToList();
                return Ok(Usuario);
            }
        }
    }
}
