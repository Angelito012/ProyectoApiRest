namespace ProyectoAPIREST.Models.Solicitudes
{
    public class SolicitudInstructor
    {
        public int IdUsuario { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Correo { get; set; }
        public string? Telefono { get; set; }
        public string? Contraseña { get; set; }
        public string? Estado { get; set; }
        public string? Rol { get; set; }
        public string? Experiencia { get; set; }
        public string? Certificaciones { get; set; }
        public string? NombreBanco { get; set; }
        public string? NombreCuenta { get; set; }
        public string? TipoCuenta { get; set; }
        public string? NoCuenta { get; set; }
    }
}
