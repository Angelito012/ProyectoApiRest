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
    //[Authorize]
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

        [HttpPost]
        [Route("VerLeccionPorId")]
        public ActionResult VerLeccionPorId(SolicitudLeccion leccionSol)
        {
            LeccionConPreguntas conpreguntas = new LeccionConPreguntas();

            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "VERLECCIONPORID";
                cmd.Parameters.Add("@LECCION", SqlDbType.Int).Value = leccionSol.IdLeccion;
                SqlDataReader dr = cmd.ExecuteReader();
  
                while (dr.Read())
                {
                    SolicitudPregunta pregunta = new SolicitudPregunta();
                    conpreguntas.IdLeccion = dr.GetInt32(0);
                    conpreguntas.Nombre = dr.GetString(1);
                    conpreguntas.Descripcion = dr.GetString(2);
                    conpreguntas.Duración = dr.GetString(3);
                    conpreguntas.Enlace = dr.GetString(4);
                    pregunta.IdPregunta = dr.GetInt32(5);
                    pregunta.Duda = dr.GetString(6);
                    pregunta.usuario = dr.GetString(8);
                    pregunta.Correo = dr.GetString(9);
                    pregunta.Respuesta = dr.GetString(7);
                    conpreguntas.preguntas.Add(pregunta);
                }
                conn.Close();
                dr.Close();
            }

            return Ok(conpreguntas);
        }
    }
}
