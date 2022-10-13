using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProyectoAPIREST.Models.Solicitudes;
using System.Data;

namespace ProyectoAPIREST.Controllers
{
    public class SolicitudProfesor
    {
        public string correo { get; set; }
        public string curso { get; set; }
    }
    public class SolicitudAdmin
    {
        public string curso { get; set; }
    }

    public class SolicitudListado
    {
        public int idCurso { get; set; }
    }

    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class IngresoPorCurso : ControllerBase
    {
        [HttpPost]
        [Route("ListadoEstudiantes")]

        public ActionResult ListadoEstudiantes(SolicitudListado curso)
        {
            List<IngresosPorCursos> ingresosPorCursos = new List<IngresosPorCursos>();
            using(Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "listaEstudiantes";
                cmd.Parameters.Add("@IDCURSO", SqlDbType.Int).Value = curso.idCurso;
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    IngresosPorCursos list = new IngresosPorCursos();
                    list.idCurso = dr.GetInt32(0);
                    list.nombre = dr.GetString(1);
                    list.correo = dr.GetString(2);
                    list.Fecha = dr.GetDateTime(3);
                    ingresosPorCursos.Add(list);
                }
                conn.Close();
                dr.Close();
            }
            return Ok(ingresosPorCursos);
        }

        [HttpPost]
        [Route("IngresoCursoProfesor")]
        public ActionResult INGRESOCURSOPROFESOR(SolicitudProfesor profesor)
        {
            List<IngresosPorCursos> ingresosPorCursos = new List<IngresosPorCursos>();
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "INGRESOCURSOPROFESOR";
                cmd.Parameters.Add("@CORREO", SqlDbType.VarChar).Value = profesor.correo;
                cmd.Parameters.Add("@CURSO", SqlDbType.VarChar).Value = profesor.curso;
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    IngresosPorCursos ingreso = new IngresosPorCursos();
                    ingreso.profesor = dr.GetString(0);
                    ingreso.correo = dr.GetString(1);
                    ingreso.idCurso = dr.GetInt32(2);
                    ingreso.curso = dr.GetString(3);
                    ingreso.cantidad = dr.GetInt32(4);
                    ingreso.precioProfesor = dr.GetDouble(5);
                    ingreso.TotalProfesor = dr.GetDouble(6);
                    ingresosPorCursos.Add(ingreso);
                }
                conn.Close();
                dr.Close();
            }
            return Ok(ingresosPorCursos);
        }

        [HttpPost]
        [Route("IngresoCursoAdmin")]
        public ActionResult INGRESOCURSOADMIN(SolicitudAdmin curso)
        {
            List<IngresosPorCursos> ingresosPorCursos = new List<IngresosPorCursos>();
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "INGRESOCURSOADMIN";
                cmd.Parameters.Add("@CURSO", SqlDbType.VarChar).Value = curso.curso;
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    IngresosPorCursos ingreso = new IngresosPorCursos();
                    ingreso.profesor = dr.GetString(0);
                    ingreso.correo = dr.GetString(1);
                    ingreso.idCurso = dr.GetInt32(2);
                    ingreso.curso = dr.GetString(3);
                    ingreso.cantidad = dr.GetInt32(4);
                    ingreso.precioProfesor = dr.GetDouble(5);
                    ingreso.precioVenta = dr.GetDouble(6);
                    ingreso.TotalProfesor = dr.GetDouble(7);
                    ingreso.totalVenta = dr.GetDouble(8);
                    ingreso.ganancia = dr.GetDouble(9);
                    ingresosPorCursos.Add(ingreso);
                }
                conn.Close();
                dr.Close();
            }
            return Ok(ingresosPorCursos);
        }
    }
}
