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

        [HttpPost]
        [Route("VerFactura")]

        public ActionResult FacturaDetalle(Models.Solicitudes.numeroFactura detalleNum)
        {
            List<SolicitudDetalleParaFactura> detalles = new List<SolicitudDetalleParaFactura>();
            using (Models.DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "MostrarFacturaPorID";
                cmd.Parameters.Add("@NFAC", SqlDbType.Int).Value = detalleNum.NoFactura;
                SqlDataReader dr = cmd.ExecuteReader();
                SolicitudFacturaParaDetalle DFactura = new SolicitudFacturaParaDetalle();
                while (dr.Read())
                {
                    DFactura.NoFactura = dr.GetInt32(0);
                    DFactura.Fecha = dr.GetDateTime(1);
                    DFactura.Total = dr.GetDouble(2);
                    DFactura.nombre = dr.GetString(3) + " " + dr.GetString(4);
                }
                conn.Close();
                dr.Close();


                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "MostrarDetallePorID";;
                SqlDataReader det = cmd.ExecuteReader();
                while (det.Read())
                {
                    SolicitudDetalleParaFactura Detalle = new SolicitudDetalleParaFactura();
                    Detalle.NoFactura = det.GetInt32(0);
                    Detalle.IdCurso = det.GetInt32(1);
                    Detalle.Precioactual = det.GetDouble(2);
                    Detalle.nombre = det.GetString(3);
                    DFactura.detalle.Add(Detalle);
                }
                dr.Close();
                conn.Close();
                

                return Ok(DFactura);

            }
            
        }

    }
}
