using System;
using System.Collections.Generic;

namespace ProyectoAPIREST.Models
{
    public partial class Carrito
    {
        public int IdUsuario { get; set; }
        public int IdCurso { get; set; }
        public double? Precioactual { get; set; }

        public virtual Curso IdCursoNavigation { get; set; } = null!;
        public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
    }
}
