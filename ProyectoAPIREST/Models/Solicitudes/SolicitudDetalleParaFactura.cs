namespace ProyectoAPIREST.Models.Solicitudes
{
    public class SolicitudDetalleParaFactura
    {
        public int NoFactura { get; set; }

        public string nombre { get; set; }
        public int IdCurso { get; set; }

        public double? Precioactual { get; set; }
    }
}
