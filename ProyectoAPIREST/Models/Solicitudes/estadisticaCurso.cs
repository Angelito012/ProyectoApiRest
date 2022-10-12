namespace ProyectoAPIREST.Models.Solicitudes
{
    public class estadisticaCurso
    {
        public string nombreCurso { get; set; }
        public string Instructor { get; set; }
        public string Descripcion { get; set; }
        public int Duracion { get; set; }
        public string Estado { get; set; }
        public int cantidadEstudiantes { get; set; }
    }
}
