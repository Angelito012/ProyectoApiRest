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
    [ApiController]
    public class MainVaciarCarritoDelete : ControllerBase
    {
        [HttpDelete]
        [Route("VaciarCarrito")]
        public ActionResult VaciarCarrito(SolicitudCarrito carrito)
        {
            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "VaciarCarrito";
                cmd.Parameters.Add("@IDUSUARIO", SqlDbType.Int).Value = carrito.IdUsuario;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }
    }
}
