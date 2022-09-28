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

        [HttpPost]
        [Route("CrearCurso")]
        public ActionResult CrearCurso(SolicitudCrearCurso curso)
        {
            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "CrearCurso";
                cmd.Parameters.Add("@NOMBRE", SqlDbType.VarChar).Value = curso.Nombre;
                cmd.Parameters.Add("@DESCRIPCION", SqlDbType.VarChar).Value = curso.Descripcion;
                cmd.Parameters.Add("@DURACION", SqlDbType.Int).Value = curso.Duracion;
                cmd.Parameters.Add("@COSTO", SqlDbType.Float).Value = curso.Costo;
                cmd.Parameters.Add("@PRECIO", SqlDbType.Float).Value = curso.Precio;
                cmd.Parameters.Add("@ESTADO", SqlDbType.VarChar).Value = curso.Estado;
                cmd.Parameters.Add("@IDPROFESOR", SqlDbType.Int).Value = curso.IdProfesor;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }
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
                cmd.Parameters.Add("@DURACION", SqlDbType.Int).Value = curso.Duracion;
                cmd.Parameters.Add("@COSTO", SqlDbType.Float).Value = curso.Costo;
                cmd.Parameters.Add("@ESTADO", SqlDbType.VarChar).Value = curso.Estado;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }

        [HttpPost]
        [Route("ValidarCurso")]
        public ActionResult ValidarCurso(SolicitudCurso curso)
        {
            int cantidad = 0;
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "VALIDARCURSO";
                cmd.Parameters.Add("@ID", SqlDbType.VarChar).Value = curso.IdCurso;
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    cantidad = dr.GetInt32(0);
                }
                conn.Close();
                dr.Close();
            }

            return Ok(cantidad);
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
        [HttpPost]
        [Route("BusquedaCurso")]
        public ActionResult BusquedaCurso(Models.Solicitudes.SolicitudBusquedaCurso BusquedaCurso)
        {
            List<BusquedaCurso> BusquedaCursos = new List<BusquedaCurso>();
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "BusquedaCurso";
                cmd.Parameters.Add("@NOMBRE", SqlDbType.VarChar).Value = BusquedaCurso.Nombre;
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    BusquedaCurso curso = new BusquedaCurso();
                    curso.IdCurso = dr.GetInt32(0);
                    curso.Nombre = dr.GetString(1);
                    curso.Descripcion = dr.GetString(2);
                    curso.Duracion = dr.GetInt32(3);
                    curso.Precio = dr.GetDouble(4);
                    curso.Estado = dr.GetString(5);
                    BusquedaCursos.Add(curso);
                }
                conn.Close();
                dr.Close();
            }
            return Ok(BusquedaCursos);
        }

        [HttpPost]
        [Route("BusquedaCursoComprados")]
        public ActionResult BusquedaCursoComprados(Models.Solicitudes.SolicitudBusquedaCurso BusquedaCurso)
        {
            List<BusquedaCurso> BusquedaCursos = new List<BusquedaCurso>();
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "BusquedaCursoComprados";
                cmd.Parameters.Add("@NOMBRE", SqlDbType.VarChar).Value = BusquedaCurso.Nombre;
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    BusquedaCurso curso = new BusquedaCurso();
                    curso.IdCurso = dr.GetInt32(0);
                    curso.Nombre = dr.GetString(1);
                    curso.Descripcion = dr.GetString(2);
                    curso.Duracion = dr.GetInt32(3);
                    curso.Precio = dr.GetDouble(4);
                    curso.Estado = dr.GetString(5);
                    BusquedaCursos.Add(curso);
                }
                conn.Close();
                dr.Close();
            }
            return Ok(BusquedaCursos);
        }
    }
}
