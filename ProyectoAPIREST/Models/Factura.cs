using System;
using System.Collections.Generic;

namespace ProyectoAPIREST.Models
{
    public partial class Factura
    {
        public Factura()
        {
            Detallefacturas = new HashSet<Detallefactura>();
        }

        public int NoFactura { get; set; }
        public DateTime? Fecha { get; set; }
        public double? Total { get; set; }
        public int? IdUsuario { get; set; }

        public virtual Usuario? IdUsuarioNavigation { get; set; }
        public virtual ICollection<Detallefactura> Detallefacturas { get; set; }
    }
}
