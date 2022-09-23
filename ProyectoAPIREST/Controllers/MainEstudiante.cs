using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ProyectoAPIREST.Models;
using ProyectoAPIREST.Models.Solicitudes;
using System.Text;
using System.Data;

namespace ProyectoAPIREST.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class MainEstudiante : Controller
    {
        [HttpPut]
        [Route("EditarInfoEstudiantes")]
        public ActionResult EditarEstuduante(SolicitudEstudiante estudiante)
        {
            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "EstudinateEditar";
                cmd.Parameters.Add("@NOMBRE", SqlDbType.VarChar).Value = estudiante.Nombre;
                cmd.Parameters.Add("@APELLIDO", SqlDbType.VarChar).Value = estudiante.Apellido;
                cmd.Parameters.Add("@CORREO", SqlDbType.VarChar).Value = estudiante.Correo;
                cmd.Parameters.Add("@CONTRASEÑA", SqlDbType.VarChar).Value = estudiante.Contraseña;
                cmd.Parameters.Add("@TELEFONO", SqlDbType.VarChar).Value = estudiante.Telefono;
                cmd.Parameters.Add("@NIT", SqlDbType.VarChar).Value = estudiante.Nit;
                cmd.Parameters.Add("@TARJETACREDITO", SqlDbType.VarChar).Value = estudiante.TarjetaCredito;
                cmd.Parameters.Add("@ESTADO", SqlDbType.VarChar).Value = estudiante.Estado;
                cmd.Parameters.Add("@ROL", SqlDbType.VarChar).Value = estudiante.Rol;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }
    }
}
