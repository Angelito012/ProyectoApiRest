namespace ProyectoAPIREST.Models.Solicitudes
{
    public class LeccionConPreguntas
    {
        public int IdLeccion { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int Duración { get; set; }
        public string Enlace { get; set; }

        List<SolicitudPregunta> prueba = new List<SolicitudPregunta>();
        public List<SolicitudPregunta> preguntas => prueba;

    }
}