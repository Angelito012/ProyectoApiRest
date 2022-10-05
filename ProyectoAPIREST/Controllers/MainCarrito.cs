using Microsoft.AspNetCore.Authorization;
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
    public class MainCarrito : ControllerBase
    {
        [HttpPost]
        [Route("AñadirCarrito")]
        public ActionResult AñadirCarrito([FromBody] Models.Carrito carrito)
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "AñadiraCarrito";
                cmd.Parameters.Add("@IDUSUARIO", SqlDbType.VarChar).Value = carrito.IdUsuario;
                cmd.Parameters.Add("@IDCURSO", SqlDbType.VarChar).Value = carrito.IdCurso;
                cmd.Parameters.Add("@PRECIOACTUAL", SqlDbType.VarChar).Value = carrito.Precioactual;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }

        [HttpDelete]
        [Route("EliminardeCarrito")]
        public ActionResult EliminardeCarrito(Models.Carrito carrito)
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "EliminardeCarrito";
                cmd.Parameters.Add("@IDUSUARIO", SqlDbType.Int).Value = carrito.IdUsuario;
                cmd.Parameters.Add("@IDCURSO", SqlDbType.Int).Value = carrito.IdCurso;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }
    }
}