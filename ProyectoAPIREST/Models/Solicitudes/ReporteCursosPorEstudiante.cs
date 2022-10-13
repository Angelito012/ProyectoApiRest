namespace ProyectoAPIREST.Models.Solicitudes
{
    public class ReporteCursosPorEstudiante
    {
        public int IdCurso { get; set; }
        public string? Nombre { get; set; }
        public double? Precio { get; set; }
        public int Duracion { get; set; }
        public int Lecciones { get; set; }

    }
}
