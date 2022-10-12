namespace ProyectoAPIREST.Models.Solicitudes
{
    public class IngresosPorCursos
    {
        public string profesor { get; set; }
        public string correo { get; set; }
        public int idCurso { get; set; }
        public string curso { get; set; }
        public int cantidad { get; set; }
        public double precioProfesor { get; set; }
        public double precioVenta { get; set; }
        public double TotalProfesor { get; set; }
        public double totalVenta { get; set; }
        public double ganancia { get; set; }
    }
}
