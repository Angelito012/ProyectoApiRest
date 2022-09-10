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
    [Authorize]
    [ApiController]
    public class MainInstructorController : ControllerBase
    {
        [HttpGet]
        [Route("VerCursos")]
        public ActionResult VerCursos(Models.Solicitudes.AutorizacionUsuarios instructor)
        {
            List<SolicitudCurso> cursos = new List<SolicitudCurso>();
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "CURSOPROFESOR";
                cmd.Parameters.Add("@PROFESOR", SqlDbType.VarChar).Value = instructor.correo;
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SolicitudCurso curso = new SolicitudCurso();
                    curso.IdCurso = dr.GetInt32(0);
                    curso.Nombre = dr.GetString(1);
                    curso.Descripcion = dr.GetString(2);
                    curso.Duracion = dr.GetString(3);
                    curso.Costo = dr.GetDouble(4);
                    curso.Estado = dr.GetString(5);
                    cursos.Add(curso);
                }
                conn.Close();
                dr.Close();
            }
            
            return Ok(cursos);
        }

        [HttpPut]
        [Route("EditarInstructor")]
        public ActionResult EditarInstructor(SolicitudInstructor instructor)
        {
            using(DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "EDITARINSTRUCTOR";
                cmd.Parameters.Add("@NOMBRE", SqlDbType.VarChar).Value = instructor.Nombre;
                cmd.Parameters.Add("@APELLIDO", SqlDbType.VarChar).Value = instructor.Apellido;
                cmd.Parameters.Add("@CORREO", SqlDbType.VarChar).Value = instructor.Correo;
                cmd.Parameters.Add("@CONTRASEÑA", SqlDbType.VarChar).Value = instructor.Contraseña;
                cmd.Parameters.Add("@TELEFONO", SqlDbType.VarChar).Value = instructor.Telefono;
                cmd.Parameters.Add("@ESTADO", SqlDbType.VarChar).Value = instructor.Estado;
                cmd.Parameters.Add("@ROL", SqlDbType.VarChar).Value = instructor.Rol;
                cmd.Parameters.Add("@EXPERIENCIA", SqlDbType.VarChar).Value = instructor.Experiencia;
                cmd.Parameters.Add("@CERTIFICACION", SqlDbType.VarChar).Value = instructor.Certificaciones;
                cmd.Parameters.Add("@BANCO", SqlDbType.VarChar).Value = instructor.NombreBanco;
                cmd.Parameters.Add("@NOMBRECUENTA", SqlDbType.VarChar).Value = instructor.NombreCuenta;
                cmd.Parameters.Add("@TIPOCUENTA", SqlDbType.VarChar).Value = instructor.TipoCuenta;
                cmd.Parameters.Add("@NOCUENTA", SqlDbType.VarChar).Value = instructor.NoCuenta;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }
    }
}
