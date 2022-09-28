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
    public class MainLeccionController : ControllerBase
    {
        [HttpPost]
        [Route("VerLecciones")]
        public ActionResult VerCursos(Models.Solicitudes.SolicitudCurso curso)
        {
            List<SolicitudLeccion> lecciones = new List<SolicitudLeccion>();
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "LECCIONCURSO";
                cmd.Parameters.Add("@CURSO", SqlDbType.VarChar).Value = curso.IdCurso;
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SolicitudLeccion leccion = new SolicitudLeccion();
                    leccion.IdLeccion = dr.GetInt32(0);
                    leccion.Nombre = dr.GetString(1);
                    leccion.Descripcion = dr.GetString(2);
                    leccion.Duración = dr.GetString(3);
                    leccion.Enlace = dr.GetString(4);
                    lecciones.Add(leccion);
                }
                conn.Close();
                dr.Close();
            }

            return Ok(lecciones);
        }

        [HttpDelete]
        [Route("EliminarLeccion")]
        public ActionResult EliminarLeccion(SolicitudCurso curso)
        {
            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "ELIMINARLECCION";
                cmd.Parameters.Add("@ID", SqlDbType.Int).Value = curso.IdCurso;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }
    }
}
