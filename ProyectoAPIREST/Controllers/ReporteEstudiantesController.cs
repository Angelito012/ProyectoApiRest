using Microsoft.AspNetCore.Authorization;
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
    public class ReporteEstudiantesController : ControllerBase
    {
        [HttpGet]
        [Route("EstudianteCurso")]
        public ActionResult VerEstudiantes()
        {
            List<ResporteEstudiante> Estudiantes = new List<ResporteEstudiante>();
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "MOSTRARESTUDIANTES";
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    ResporteEstudiante Estudiante = new ResporteEstudiante();
                    Estudiante.IdUsuario = dr.GetInt32(0);
                    Estudiante.Nombre = dr.GetString(1);
                    Estudiante.Apellido = dr.GetString(2);
                    Estudiante.Estado = dr.GetString(3);
                    Estudiante.Correo = dr.GetString(4);
                    Estudiante.Cursos = dr.GetInt32(5);
                    if (dr.IsDBNull(6))
                    {
                        Estudiante.Gasto = 0;
                    }
                    else 
                    {
                        Estudiante.Gasto = dr.GetDouble(6);
                    }
                    
                    Estudiantes.Add(Estudiante);
                }
                conn.Close();
                dr.Close();
            }

            return Ok(Estudiantes);
        }
        [HttpPost]
        [Route("EstudianteCurso")]
        public ActionResult VerCursosDeEstudiante(Models.Solicitudes.idusuario id)
        {
            List<ReporteCursosPorEstudiante> Cursos = new List<ReporteCursosPorEstudiante>();
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "REPORTECURSOSPORESTUDIANTE";
                cmd.Parameters.Add("@ID", SqlDbType.Int).Value = id.IdUsuario;
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    ReporteCursosPorEstudiante curso = new ReporteCursosPorEstudiante();
                    curso.IdCurso = dr.GetInt32(0);
                    curso.Nombre = dr.GetString(1);
                    curso.Precio = dr.GetDouble(2);
                    curso.Duracion = dr.GetInt32(3);
                    curso.Lecciones = dr.GetInt32(4);

                    Cursos.Add(curso);
                }
                conn.Close();
                dr.Close();
            }

            return Ok(Cursos);
        }


    }
}
