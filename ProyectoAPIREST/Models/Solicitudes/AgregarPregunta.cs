namespace ProyectoAPIREST.Models.Solicitudes
{
    public class AgregarPregunta
    {
        public int IdPregunta { get; set; }
        public string Duda { get; set; } = null!;
        public string Respuesta { get; set; } = null!;
        public int IdLeccion { get; set; }
        public int IdUsuario { get; set; }
    }
}
