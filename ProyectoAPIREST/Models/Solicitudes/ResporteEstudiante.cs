namespace ProyectoAPIREST.Models.Solicitudes
{
    public class ResporteEstudiante
    {
        public int IdUsuario { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Estado { get; set; }
        public string? Correo { get; set; }
        public int Cursos { get; set; }
        public double? Gasto { get; set; }


    }
}
