using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProyectoAPIREST.Models.Solicitudes;
using System.Data;

namespace ProyectoAPIREST.Controllers
{
    public class SolicitudCorreo
    {
        public string correo { get; set; }
    }
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class estadisticaCursoController : Controller
    {
            [HttpPost]
            [Route("EstadisticaCursoInstructor")]
            public ActionResult EstadisticaCursoInstructor(SolicitudCorreo correo)
            {
                List<estadisticaCurso> estadisticaCursos = new List<estadisticaCurso>();
                using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
                {
                    string conexion = db.connectionString();
                    SqlConnection conn = new SqlConnection(conexion);
                    SqlCommand cmd = conn.CreateCommand();
                    conn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "EstadisticaCursoPorInstructor";
                    cmd.Parameters.Add("@INSTRUCTOR", SqlDbType.VarChar).Value = correo.correo;
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        estadisticaCurso curso = new estadisticaCurso();
                        curso.nombreCurso = dr.GetString(0);
                        curso.Descripcion = dr.GetString(1);
                        curso.Duracion = dr.GetInt32(2);
                        curso.Estado = dr.GetString(3);
                        curso.cantidadEstudiantes = dr.GetInt32(4);
                        estadisticaCursos.Add(curso);
                    }
                    conn.Close();
                    dr.Close();
                }
                return Ok(estadisticaCursos);
            }

            [HttpGet]
            [Route("EstadisticaCursoAdmin")]
            public ActionResult EstadisticaCursoAdmin()
            {
                List<estadisticaCurso> estadisticaCursos = new List<estadisticaCurso>();
                using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
                {
                    string conexion = db.connectionString();
                    SqlConnection conn = new SqlConnection(conexion);
                    SqlCommand cmd = conn.CreateCommand();
                    conn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "EstadisticaCurso";
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        estadisticaCurso curso = new estadisticaCurso();
                        curso.nombreCurso = dr.GetString(0);
                        curso.Instructor = dr.GetString(1);
                        curso.Descripcion = dr.GetString(2);
                        curso.Duracion = dr.GetInt32(3);
                        curso.Estado = dr.GetString(4);
                        curso.cantidadEstudiantes = dr.GetInt32(5);
                        estadisticaCursos.Add(curso);
                }
                    conn.Close();
                    dr.Close();
                }
                return Ok(estadisticaCursos);
            }
        
    }
}
