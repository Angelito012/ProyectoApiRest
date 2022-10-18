using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProyectoAPIREST.Models;
using ProyectoAPIREST.Models.Solicitudes;
using System.Data;
using System.Reflection.PortableExecutable;

namespace ProyectoAPIREST.Controllers
{
    public class modIndex
    {
        public int curso { get; set; }
        public int index { get; set; }
    }

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
                    leccion.Orden = modelo.Orden;

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


        [HttpPost]
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
                leccion.Orden = modelo.Orden;

                db.Entry(leccion).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                Models.Curso curso = db.Cursos.Find(leccion.IdCurso);
                curso.Duracion = (curso.Duracion - duracionAnterior) + modelo.Duración;

                db.Entry(curso).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                
            }
            return Ok("datos actualizados correctamente de la leccion");
        }

        [HttpPost]
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

        [HttpPost]
        [Route("ValidarIndex")]
        public ActionResult ValidarIndex(modIndex modelo)
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "VALIDARINDEX";
                cmd.Parameters.Add("@CURSO", SqlDbType.Int).Value = modelo.curso;
                cmd.Parameters.Add("@ORDEN", SqlDbType.Int).Value = modelo.index;
                SqlDataReader dr = cmd.ExecuteReader();
                int contador = 0;

                while (dr.Read())
                {
                    contador++;
                }

                conn.Close();
                dr.Close();

                if (contador == 0)
                {
                    return Ok("Index libre");
                }
                else
                {
                    return Ok("Index Ocupado");
                }
            }
        }

        [HttpPost]
        [Route("ModificarIndex")]
        public ActionResult ModificarIndex(modIndex modelo)
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd2 = conn.CreateCommand();
                conn.Open();
                cmd2.CommandType = CommandType.StoredProcedure;
                cmd2.CommandText = "MODIFICARORDEN";
                cmd2.Parameters.Add("@CURSO", SqlDbType.Int).Value = modelo.curso;
                cmd2.Parameters.Add("@ORDEN", SqlDbType.Int).Value = modelo.index;
                cmd2.ExecuteNonQuery();
                conn.Close();
                return Ok("Orden Modificado");
            } 
        }
    }
}
