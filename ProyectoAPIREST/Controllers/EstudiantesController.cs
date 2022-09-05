﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace ProyectoAPIREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudiantesController : ControllerBase
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
                usuario.Telefono = modelo.Telefono;
                usuario.Nit = modelo.Nit;
                usuario.TarjetaCredito = modelo.TarjetaCredito;
                usuario.Contraseña = modelo.Contraseña;
                usuario.Estado = "A";
                usuario.Rol = "ESTUDIANTE";

                db.Usuarios.Add(usuario);
                db.SaveChanges();
                }
                else
                {
                    return NotFound("Correo ya Regsitrado");
                }
            }
            return Ok("El estudiante se añadio correctamente");
        }
    }  
}
