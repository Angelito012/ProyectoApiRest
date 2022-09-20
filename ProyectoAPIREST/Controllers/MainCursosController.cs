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
    public class MainCursosController : ControllerBase
    {
        [HttpPut]
        [Route("EditarCurso")]
        public ActionResult EditarCurso(SolicitudCurso curso)
        {
            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "EDITARCURSO";
                cmd.Parameters.Add("@ID", SqlDbType.Int).Value = curso.IdCurso;
                cmd.Parameters.Add("@NOMBRE", SqlDbType.VarChar).Value = curso.Nombre;
                cmd.Parameters.Add("@DESCRIPCION", SqlDbType.VarChar).Value = curso.Descripcion;
                cmd.Parameters.Add("@DURACION", SqlDbType.VarChar).Value = curso.Duracion;
                cmd.Parameters.Add("@COSTO", SqlDbType.Float).Value = curso.Costo;
                cmd.Parameters.Add("@ESTADO", SqlDbType.VarChar).Value = curso.Estado;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }

        [HttpDelete]
        [Route("EliminarCurso")]
        public ActionResult EliminarCurso(SolicitudCurso curso)
        {
            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "ELIMINARCURSO";
                cmd.Parameters.Add("@ID", SqlDbType.Int).Value = curso.IdCurso;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }
    }
}
