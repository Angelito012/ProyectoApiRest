using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProyectoAPIREST.Models;
using System.Data;

namespace ProyectoAPIREST.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class LeccionController : ControllerBase
    {
        [HttpPost]
        [Route ("CrearLeccion")]
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
            return Ok("La Leccion fue creada correctamente");
        }


        [HttpPut]
        [Route ("EditarLeccion")]
        public ActionResult Put([FromBody] Models.Solicitudes.SolicitudLeccion modelo)
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                Models.Leccion leccion = db.Leccions.Find(modelo.IdLeccion);

                int duracionAnterior = leccion.Duración;

                leccion.Nombre = modelo.Nombre;
                leccion.Descripcion = modelo.Descripcion;
                leccion.Duración = modelo.Duración;
                leccion.Enlace = modelo.Enlace;

                db.Entry(leccion).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                Models.Curso curso = db.Cursos.Find(leccion.IdCurso);
                curso.Duracion = (curso.Duracion - duracionAnterior) + modelo.Duración;

                db.Entry(curso).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                
            }
            return Ok("datos actualizados correctamente de la leccion");
        }

        [HttpDelete]
        [Route ("EliminarUnaLeccion")]
        public ActionResult Delete([FromBody] Models.Solicitudes.leccionId modelo)
        {
            using(Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                Models.Leccion leccion = db.Leccions.Find(modelo.IdLeccion);

                Models.Curso curso = db.Cursos.Find(leccion.IdCurso);
                curso.Duracion = curso.Duracion - leccion.Duración;

                db.Entry(curso).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                db.Leccions.Remove(leccion);
                db.SaveChanges();
            }
            return Ok("Se elimino la leccion correctamente");
        }

    }
}
