﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ProyectoAPIREST.Models;
using ProyectoAPIREST.Models.Solicitudes;
using System.Text;
using System.Data;
using System.Diagnostics.CodeAnalysis;

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
                    paramsDetalle.IdCurso = dr.GetInt32(1);
                    paramsDetalle.nombre = dr.GetString(2);
                    paramsDetalle.Precioactual = dr.GetDouble(3);
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

        [HttpPost]
        [Route("CrearFactura")]

        public ActionResult CrearFactura(Models.Solicitudes.SolicitudFacturas facturas)
        {
        
            using (Models.DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "CrearFactura";
                cmd.Parameters.Add("@TOTAL", SqlDbType.Float).Value = facturas.Total;
                cmd.Parameters.Add("@IDUSUARIO", SqlDbType.Int).Value = facturas.IdUsuario;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            var factura = VerUltimaFactura(facturas.IdUsuario);
            return Ok(factura);
            
        }
        [HttpGet]
        [Route("VerUltimaFacturaUser")]
        public ActionResult VerUltimaFactura(int? idUsuario)
        {
            var facturas = new SolicitudFacturas();

            using (Models.DataBaseAPIContext db = new DataBaseAPIContext())
            {

                 facturas = (from d in db.Facturas
                              where d.IdUsuario == idUsuario
                              orderby d.Fecha descending
                              select new SolicitudFacturas
                              {
                                  IdUsuario = d.IdUsuario,
                                  Fecha = d.Fecha,
                                  NoFactura = d.NoFactura,
                                  Total = d.Total
                              }).FirstOrDefault();
            }

            return Ok(facturas);

        }

        [HttpPost]
        [Route("CrearDetalleFactura")]

        public ActionResult CrearDetalleFactura(Models.Solicitudes.DetalleFacturaList facturas)
        {
            using (Models.DataBaseAPIContext db = new DataBaseAPIContext())
            {
                
                
                
                foreach (SolicitudDetalleFactura facturaItem in facturas.detalleFacturaList)
                {
                    string conexion = db.connectionString();
                    SqlConnection conn = new SqlConnection(conexion);
                    SqlCommand cmd = conn.CreateCommand();
                    conn.Open();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "CrearDetalleFactura";
                    cmd.Parameters.Add("@NOFACTURA", SqlDbType.Int).Value = facturas.NoFactura;
                    cmd.Parameters.Add("@IDCURSO", SqlDbType.Int).Value = facturaItem.IdCurso;
                    cmd.Parameters.Add("@PRECIOACTUAL", SqlDbType.Float).Value = facturaItem.Precioactual;
                    cmd.ExecuteNonQuery();

                    conn.Close();
                }
                
            }
            return Ok();
        }


    }
}
