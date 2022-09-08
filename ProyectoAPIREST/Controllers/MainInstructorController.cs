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
        [HttpPost]
        [Route("VerCursos")]
        public ActionResult VerCursos(Models.Solicitudes.AutorizacionUsuarios usuario)
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
                cmd.Parameters.Add("@PROFESOR", SqlDbType.VarChar).Value = usuario.correo;
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
    }
}
