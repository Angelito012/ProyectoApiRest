namespace ProyectoAPIREST.Models.Solicitudes
{
    public class SolicitudDetalleFactura
    {

       

        public int IdCurso { get; set; }

        public double? Precioactual { get; set; }

    }

    public class DetalleFacturaList
    {
        public int NoFactura { get; set; }
        public List<SolicitudDetalleFactura> detalleFacturaList { get; set; }

    }
}
