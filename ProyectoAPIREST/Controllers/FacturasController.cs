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
    [Route ("api/controller")]
    [Authorize]
    [ApiController]
    public class FacturasController : Controller
    {
        [HttpPost]
        [Route("VerFacturas")]
        public ActionResult VerFacturas(Models.Solicitudes.AutorizacionUsuarios estudiante)
        {
            List<SolicitudFacturas> facturas = new List<SolicitudFacturas>();
            using(Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "verFacturasEstudiante";
                cmd.Parameters.Add("@ESTUDIANTE", SqlDbType.NVarChar).Value = estudiante.correo;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    SolicitudFacturas factura = new SolicitudFacturas();
                    factura.NoFactura = dr.GetInt32(0);
                    factura.Fecha = dr.GetDateTime(1);
                    factura.Total = dr.GetDouble(2);
                    factura.nombre = dr.GetString(3);
                    facturas.Add(factura);
                }
                conn.Close();
                dr.Close();
            }
            return Ok(facturas);

        }

        [HttpPost]
        [Route("VerDetalle")]

        public ActionResult VerDetalle(Models.Solicitudes.numeroFactura detalleNum)
        {
            List<SolicitudDetalle> detalles = new List<SolicitudDetalle>();
            using(Models.DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "VerDetalleFactura";
                cmd.Parameters.Add("@NOFACTURA", SqlDbType.Int).Value = detalleNum.NoFactura;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    SolicitudDetalle paramsDetalle = new SolicitudDetalle();
                    paramsDetalle.NoFactura = dr.GetInt32(0);
                    paramsDetalle.nombre = dr.GetString(1);
                    paramsDetalle.Precioactual = dr.GetDouble(2);
                    detalles.Add(paramsDetalle);
                }
                conn.Close();
                dr.Close();
            }
            return Ok(detalles);
        }
      
    }
}
