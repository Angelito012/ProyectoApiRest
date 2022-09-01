using System;
using System.Collections.Generic;

namespace ProyectoAPIREST.Models
{
    public partial class Detallefactura
    {
        public int NoFactura { get; set; }
        public int IdCurso { get; set; }
        public double? Precioactual { get; set; }

        public virtual Curso IdCursoNavigation { get; set; } = null!;
        public virtual Factura NoFacturaNavigation { get; set; } = null!;
    }
}
