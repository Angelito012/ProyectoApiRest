using System;
using System.Collections.Generic;

namespace ProyectoAPIREST.Models
{
    public partial class Preguntum
    {
        public int IdPregunta { get; set; }
        public string Duda { get; set; } = null!;
        public string Respuesta { get; set; } = null!;
        public string Instructor { get; set; } = null!;
        public string Estudiante { get; set; } = null!;
        public int IdLeccion { get; set; }
        public int IdUsuario { get; set; }

        public virtual Leccion IdLeccionNavigation { get; set; } = null!;
        public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
    }
}
