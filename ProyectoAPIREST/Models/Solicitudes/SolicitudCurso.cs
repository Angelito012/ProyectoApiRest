namespace ProyectoAPIREST.Models.Solicitudes
{
    public class SolicitudCurso
    {
        public int IdCurso { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public int? Duracion { get; set; }
        public double? Costo { get; set; }
        public double? Precio { get; set; }
        public string? Estado { get; set; }
    }
}
