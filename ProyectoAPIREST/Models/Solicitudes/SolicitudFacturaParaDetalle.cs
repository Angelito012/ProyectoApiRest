namespace ProyectoAPIREST.Models.Solicitudes
{
    public class SolicitudFacturaParaDetalle
    {
        public int NoFactura { get; set; }
        public DateTime? Fecha { get; set; }
        public double? Total { get; set; }
        public string nombre { get; set; }

        List<SolicitudDetalleParaFactura> detalles = new List<SolicitudDetalleParaFactura>();
        public List<SolicitudDetalleParaFactura> detalle => detalles;
    }
}
