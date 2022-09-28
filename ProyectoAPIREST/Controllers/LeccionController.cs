using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProyectoAPIREST.Models;
using System.Data;

namespace ProyectoAPIREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeccionController : ControllerBase
    {
        [HttpPost]
        public ActionResult Post([FromBody] Models.Solicitudes.SolicitudLeccion modelo)
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {

                
                    Models.Leccion leccion = new Models.Leccion();
                    leccion.IdCurso = modelo.IdCurso;
                    leccion.Nombre = modelo.Nombre;
                    leccion.Descripcion = modelo.Descripcion;
                    leccion.Duración = modelo.Duración;
                    leccion.Enlace = modelo.Enlace;
                    leccion.IdLeccion = modelo.IdLeccion;

                    db.Leccions.Add(leccion);
                    db.SaveChanges();

                    string conexion = db.connectionString();
                    SqlConnection conn = new SqlConnection(conexion);
                    SqlCommand cmd = conn.CreateCommand();
                    conn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "AGREGARDURACIONCURSO";
                    cmd.Parameters.Add("@ID", SqlDbType.Int).Value = modelo.IdCurso;
                    cmd.Parameters.Add("@DURACION", SqlDbType.Int).Value = modelo.Duración;
                    cmd.ExecuteNonQuery();
                    conn.Close();


            }
            return Ok("La fue creada correctamente");
        }
    }
}
