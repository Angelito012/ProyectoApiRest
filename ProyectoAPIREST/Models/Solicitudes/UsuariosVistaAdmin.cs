﻿namespace ProyectoAPIREST.Models.Solicitudes
{
    public class UsuariosVistaAdmin
    {
        public int IdUsuario { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Correo { get; set; }
        public string? Contraseña { get; set; }
        public string? Telefono { get; set; }
        public string? Estado { get; set; }
        public string? Rol { get; set; }
    }
}