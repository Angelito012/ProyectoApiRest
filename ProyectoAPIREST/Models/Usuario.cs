using System;
using System.Collections.Generic;

namespace ProyectoAPIREST.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            Carritos = new HashSet<Carrito>();
            Cursos = new HashSet<Curso>();
            Facturas = new HashSet<Factura>();
            Pregunta = new HashSet<Preguntum>();
        }

        public int IdUsuario { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Correo { get; set; }
        public string? Telefono { get; set; }
        public string? Nit { get; set; }
        public string? TarjetaCredito { get; set; }
        public string? Contraseña { get; set; }
        public string? Estado { get; set; }
        public string? Rol { get; set; }
        public string? Experiencia { get; set; }
        public string? Certificaciones { get; set; }
        public string? NombreBanco { get; set; }
        public string? NombreCuenta { get; set; }
        public string? TipoCuenta { get; set; }
        public string? NoCuenta { get; set; }

        public virtual ICollection<Carrito> Carritos { get; set; }
        public virtual ICollection<Curso> Cursos { get; set; }
        public virtual ICollection<Factura> Facturas { get; set; }
        public virtual ICollection<Preguntum> Pregunta { get; set; }
    }
}
