﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProyectoAPIREST.Models;
using ProyectoAPIREST.Models.Solicitudes;
using System.Data;

namespace ProyectoAPIREST.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
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

        [HttpDelete]
        [Route("EliminarUsuario")]
        public ActionResult EliminarUsuario(AutorizacionUsuarios usuario)
        {
            using(DataBaseAPIContext db = new DataBaseAPIContext())
            {
                try
                {
                    string conexion = db.connectionString();
                    SqlConnection conn = new SqlConnection(conexion);
                    SqlCommand cmd = conn.CreateCommand();
                    conn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "ELIMINARUSUARIO";
                    cmd.Parameters.Add("@CORREO", SqlDbType.VarChar).Value = usuario.correo;
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
                catch (Exception e)
                {
                    return NotFound("Este usuario no puede ser eliminador porque tiene asociado un curso");
                    throw;
                }
                
            }
            return Ok();
        }

        [HttpPut]
        public ActionResult CambiarEstado(CambioEstado usuario)
        {
            string msg = "";
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                if(usuario.Estado == "I")
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "HABILITAR";
                    cmd.Parameters.Add("@ID", SqlDbType.Int).Value = usuario.IdUsuario;
                    msg = "Habilitado";
                }
                else
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "INHABILITAR";
                    cmd.Parameters.Add("@ID", SqlDbType.Int).Value = usuario.IdUsuario;
                    msg = "Inhabilitado";
                }

                cmd.ExecuteNonQuery();
                conn.Close();

            }
            return Ok(msg);
        }

        [HttpGet]
        [Route("Instructor")]

        public ActionResult GetInstructor()
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Usuario = (from d in db.Usuarios
                               where d.Rol == "Instructor"
                               select d).ToList();
                return Ok(Usuario);
            }
        }


        [HttpGet]
        [Route("Estudiante")]
        public ActionResult GetEstudiante()
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Usuario = (from d in db.Usuarios
                               where d.Rol == "Estudiante"
                               select d).ToList();
                return Ok(Usuario);
            }
        }



    }
}
