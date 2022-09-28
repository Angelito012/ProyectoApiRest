using System;
using System.Collections.Generic;

namespace ProyectoAPIREST.Models
{
    public partial class Curso
    {
        public Curso()
        {
            Carritos = new HashSet<Carrito>();
            Detallefacturas = new HashSet<Detallefactura>();
            Leccions = new HashSet<Leccion>();
        }

        public int IdCurso { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public int? Duracion { get; set; }
        public double? Costo { get; set; }
        public double? Precio { get; set; }
        public string? Estado { get; set; }
        public int? Profesor { get; set; }

        public virtual Usuario? ProfesorNavigation { get; set; }
        public virtual ICollection<Carrito> Carritos { get; set; }
        public virtual ICollection<Detallefactura> Detallefacturas { get; set; }
        public virtual ICollection<Leccion> Leccions { get; set; }
    }
}
