namespace ProyectoAPIREST.Models.Solicitudes
{
    public class SolicitudPregunta
    {
        public int IdPregunta { get; set; }
        public string Duda { get; set; } = null!;
        public string Respuesta { get; set; } = null!;
        public string? Estudiante { get; set; }
        public string? Instructor { get; set; }
        public string? Correo { get; set; }
    }
}
