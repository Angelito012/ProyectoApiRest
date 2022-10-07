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
    public class UsuariosController : ControllerBase
    {
        [HttpPost]
        [Route("Get")]
        public ActionResult Get(Models.Solicitudes.AutorizacionUsuarios usuario)
        {
            using (Models.DataBaseAPIContext db = new Models.DataBaseAPIContext())
            {
                var Usuario = (from d in db.Usuarios
                               where d.Correo == usuario.correo && d.Contraseña == usuario.clave
                                select d).ToList();

                return Ok(Usuario);
            }
        }

        }
    }
