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
        [HttpPost]
        [Route("AñadirCarrito")]
        public ActionResult AñadirCarrito(SolicitudCarrito carrito)
        {
         

            using (DataBaseAPIContext db = new DataBaseAPIContext())
            {
                var crusos = (from d in db.Carritos
                              where d.IdCurso == carrito.IdCurso && d.IdUsuario == carrito.IdUsuario
                              select d.IdCurso).ToList();
                if(crusos.Count == 0)
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
                else
                {
                    return NotFound("Este curso ya fue agregado al carrito");
                }
                
            }
            return Ok("El curso se agrego correctamente al carrito");
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
    }
}