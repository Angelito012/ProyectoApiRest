using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ProyectoAPIREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Usuario = (from d in db.Usuarios
                               select d).ToList();
                return Ok(Usuario);
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] Models.Solicitudes.SolicitudInstructor modelo)
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                Models.Usuario usuario = new Models.Usuario();
                usuario.Nombre = modelo.Nombre;
                usuario.Apellido = modelo.Apellido;
                usuario.Correo = modelo.Correo;
                usuario.Telefono = modelo.Telefono;
                usuario.Contraseña = modelo.Contraseña;
                usuario.Estado = "A";
                usuario.Rol = "INSTRUCTOR";
                usuario.Experiencia = modelo.Experiencia;
                usuario.Certificaciones = modelo.Certificaciones;
                usuario.NombreBanco = modelo.NombreBanco;
                usuario.NombreCuenta = modelo.NombreCuenta;
                usuario.TipoCuenta = modelo.TipoCuenta;
                usuario.NoCuenta = modelo.NoCuenta;

                db.Usuarios.Add(usuario);
                db.SaveChanges();
            }
            return Ok("La empresa se añadio correctamente");
        }

    }
}
