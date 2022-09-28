namespace ProyectoAPIREST.Models.Solicitudes
{
    public class SolicitudLeccion
    {
        public int IdLeccion { get; set; }
        public string Nombre { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public int Duración { get; set; }
        public string Enlace { get; set; } = null!;
        public int IdCurso { get; set; }
    }
}
