using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ProyectoAPIREST.Models;
using ProyectoAPIREST.Models.Solicitudes;
using System.Text;
using System.Data;



namespace ProyectoAPIREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudiantesController : ControllerBase
    {
        [HttpPost]
        [Route ("GetEstudiantesinfo")]
        public ActionResult Get(Models.Solicitudes.AutorizacionUsuarios usuario)
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Usuario = (from d in db.Usuarios
                               where d.Correo == usuario.correo 
                               select d).ToList();
                return Ok(Usuario);
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] Models.Solicitudes.SolicitudEstudiante modelo)
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Correos = (from d in db.Usuarios
                               where d.Correo == modelo.Correo
                               select d.Correo).ToList();
                if (Correos.Count == 0)
                {
                    Models.Usuario usuario = new Models.Usuario();
                    usuario.Nombre = modelo.Nombre;
                    usuario.Apellido = modelo.Apellido;
                    usuario.Correo = modelo.Correo;
                    usuario.Contraseña = modelo.Contraseña;
                    usuario.Telefono = modelo.Telefono;
                    usuario.Nit = modelo.Nit;
                    usuario.TarjetaCredito = modelo.TarjetaCredito;
                    usuario.Estado = "A";
                    usuario.Rol = "Estudiante";

                    db.Usuarios.Add(usuario);
                    db.SaveChanges();
                }
                else
                {
                    return NotFound("Correo ya Registrado");

                }
            }
            return Ok("El estudiante se añadio correctamente");
        }

    }  
}
