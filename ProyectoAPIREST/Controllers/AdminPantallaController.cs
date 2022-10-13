using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProyectoAPIREST.Models;
using ProyectoAPIREST.Models.Solicitudes;
using System.Data;

namespace ProyectoAPIREST.Controllers
{
    public class SolicitudDeleteCurso
    {
        public int idCurso { get; set; }
    }

    public class SolicitudEstadoCurso
    {
        public string? Estado { get; set; }
        public int idCurso { get; set; }

        
    }

    public class SolicitudCursosGet
    {
        public int idCurso { get; set; }

        public string Nombre { get; set; }

        public string Descripcion { get; set; }

        public string Estado { get; set; }
    }


    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AdminPantallaController : ControllerBase
    {
        [HttpGet]
        [Route("CursosCompletos")]

        public ActionResult GetCursosCompletos()
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var curso = (from d in db.Cursos
                               select d).ToList();
                return Ok(curso);
            }
        }


        [HttpGet]
        public ActionResult Get()
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Usuario = (from d in db.Usuarios
                               where d.Rol != "Administrador"
                               select d).ToList();
                return Ok(Usuario);
            }
        }

        [HttpGet]
        [Route("GetCursos")]

        public ActionResult GetCursos()
        {
            List<SolicitudCursosGet> getCursos = new List<SolicitudCursosGet>();
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "CursosNoCompradosAdmin";
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SolicitudCursosGet curso = new SolicitudCursosGet();
                    curso.idCurso = dr.GetInt32(0);
                    curso.Nombre = dr.GetString(1);
                    curso.Descripcion = dr.GetString(2);
                    curso.Estado = dr.GetString(3);
                    getCursos.Add(curso);
                }
                conn.Close();
                dr.Close();
            }
            return Ok(getCursos);
        }

        [HttpDelete]
        [Route("EliminarCursoAdmin")]
        public ActionResult EliminarCursoAdmin(SolicitudDeleteCurso curso)
        {
            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                try
                {
                    string conexion = db.connectionString();
                    SqlConnection conn = new SqlConnection(conexion);
                    SqlCommand cmd = conn.CreateCommand();
                    conn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "ELIMINARCURSOADMIN";
                    cmd.Parameters.Add("@IDCURSO", SqlDbType.Int).Value = curso.idCurso;
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
                catch (Exception e)
                {
                    return NotFound("Este Curso no se puede eliminar por que tiene asociado estudiantes");
                    throw;
                }

            }
            return Ok();
        }

        [HttpPut]
        [Route("EstadoCursos")]
        public ActionResult EstadoCursos(SolicitudEstadoCurso curso)
        {
            string msg = "";
            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                if (curso.Estado == "I")
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "HABILITARCURSO";
                    cmd.Parameters.Add("@IDCURSO", SqlDbType.Int).Value = curso.idCurso;
                    msg = "Habilitado";
                }
                else
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "INHABILITARCURSO";
                    cmd.Parameters.Add("@IDCURSO", SqlDbType.Int).Value = curso.idCurso;
                    msg = "Inhabilitado";
                }

                cmd.ExecuteNonQuery();
                conn.Close();

            }
            return Ok(msg);
        }

        [HttpDelete]
        [Route("EliminarUsuario")]
        public ActionResult EliminarUsuario(AutorizacionUsuarios usuario)
        {
            using(DataBaseAPIContext db = new DataBaseAPIContext())
            {
                try
                {
                    string conexion = db.connectionString();
                    SqlConnection conn = new SqlConnection(conexion);
                    SqlCommand cmd = conn.CreateCommand();
                    conn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "ELIMINARUSUARIO";
                    cmd.Parameters.Add("@CORREO", SqlDbType.VarChar).Value = usuario.correo;
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
                catch (Exception e)
                {
                    return NotFound("Este usuario no puede ser eliminador porque tiene asociado un curso");
                    throw;
                }
                
            }
            return Ok();
        }

        [HttpPut]
        public ActionResult CambiarEstado(CambioEstado usuario)
        {
            string msg = "";
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                if(usuario.Estado == "I")
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "HABILITAR";
                    cmd.Parameters.Add("@ID", SqlDbType.Int).Value = usuario.IdUsuario;
                    msg = "Habilitado";
                }
                else
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "INHABILITAR";
                    cmd.Parameters.Add("@ID", SqlDbType.Int).Value = usuario.IdUsuario;
                    msg = "Inhabilitado";
                }

                cmd.ExecuteNonQuery();
                conn.Close();

            }
            return Ok(msg);
        }

        [HttpGet]
        [Route("Instructor")]

        public ActionResult GetInstructor()
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Usuario = (from d in db.Usuarios
                               where d.Rol == "Instructor"
                               select d).ToList();
                return Ok(Usuario);
            }
        }


        [HttpGet]
        [Route("Estudiante")]
        public ActionResult GetEstudiante()
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Usuario = (from d in db.Usuarios
                               where d.Rol == "Estudiante"
                               select d).ToList();
                return Ok(Usuario);
            }
        }



    }
}
