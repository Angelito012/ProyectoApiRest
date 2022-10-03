namespace ProyectoAPIREST.Models.Solicitudes
{
    public class SolicitudFacturas
    {
        public int NoFactura { get; set; }
        public DateTime? Fecha { get; set; }
        public double? Total { get; set; }
        public string nombre{ get; set; }

    }
}
