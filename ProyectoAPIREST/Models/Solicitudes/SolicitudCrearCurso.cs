namespace ProyectoAPIREST.Models.Solicitudes
{
    public class SolicitudCrearCurso
    {
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public int? Duracion { get; set; }
        public double? Costo { get; set; }
        public double? Precio { get; set; }
        public string? Estado { get; set; }

        public int? IdProfesor { get; set; }
    }
}
