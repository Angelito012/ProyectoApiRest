namespace ProyectoAPIREST.Models.Solicitudes
{
    public class SolicitudCurso
    {
        public int IdCurso { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public string? Duracion { get; set; }
        public double? Costo { get; set; }
        public string? Estado { get; set; }
    }
}
