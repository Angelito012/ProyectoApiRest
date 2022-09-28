using System;
using System.Collections.Generic;

namespace ProyectoAPIREST.Models
{
    public partial class Leccion
    {
        public Leccion()
        {
            Pregunta = new HashSet<Preguntum>();
        }

        public int IdLeccion { get; set; }
        public string Nombre { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public int Duración { get; set; } 
        public string Enlace { get; set; } = null!;
        public int IdCurso { get; set; }

        public virtual Curso IdCursoNavigation { get; set; } = null!;
        public virtual ICollection<Preguntum> Pregunta { get; set; }
    }
}