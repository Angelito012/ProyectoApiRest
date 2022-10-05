﻿using Microsoft.AspNetCore.Authorization;
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
    public class MainCarrito : ControllerBase
    {
        [HttpGet]
        [Route("ObtenerCarrito")]
        public ActionResult ObtenerCarrito(SolicitudCarrito carrito)
        {
            List<SolicitudCarrito> BusquedaCarrito = new List<SolicitudCarrito>();
            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "obtenerCarrito";
                cmd.Parameters.Add("@IDUSUARIO", SqlDbType.Int).Value = carrito.IdUsuario;
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    SolicitudCarrito carritos = new SolicitudCarrito();
                    carritos.IdUsuario = dr.GetInt32(0);
                    carritos.IdCurso = dr.GetInt32(1);
                    carritos.Nombre = dr.GetString(2);
                    carritos.Precioactual = dr.GetDouble(3);
                    BusquedaCarrito.Add(carritos);
                }
                conn.Close();
                dr.Close();
            }
            return Ok(BusquedaCarrito);
        }


        [HttpPost]
        [Route("AñadirCarrito")]
        public ActionResult AñadirCarrito(SolicitudCarrito carrito)
        {
            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                string conexion = db.connectionString();
                SqlConnection conn = new SqlConnection(conexion);
                SqlCommand cmd = conn.CreateCommand();
                conn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "AñadiraCarrito";
                cmd.Parameters.Add("@IDUSUARIO", SqlDbType.Int).Value = carrito.IdUsuario;
                cmd.Parameters.Add("@IDCURSO", SqlDbType.Int).Value = carrito.IdCurso;
                cmd.Parameters.Add("@PRECIOACTUAL", SqlDbType.Float).Value = carrito.Precioactual;
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return Ok();
        }

        [HttpDelete]
        [Route("EliminardeCarrito")]
        public ActionResult EliminardeCarrito(SolicitudCarrito carrito)
        {
            using (DataBaseAPIContext db = new DataBaseAPIContext())
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