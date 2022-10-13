using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ProyectoAPIREST.Models
{
    public partial class DataBaseAPIContext : DbContext
    {
        public DataBaseAPIContext()
        {
        }

        public DataBaseAPIContext(DbContextOptions<DataBaseAPIContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Carrito> Carritos { get; set; } = null!;
        public virtual DbSet<Curso> Cursos { get; set; } = null!;
        public virtual DbSet<Detallefactura> Detallefacturas { get; set; } = null!;
        public virtual DbSet<Factura> Facturas { get; set; } = null!;
        public virtual DbSet<Leccion> Leccions { get; set; } = null!;
        public virtual DbSet<Preguntum> Pregunta { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        public string connectionString()
        {

            return "Server=ERICKKDANIEL;Database=DataBaseAPI;user=prueba;password=daniel1234;";

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Server=ERICKKDANIEL;Database=DataBaseAPI;user=prueba;password=daniel1234;");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Carrito>(entity =>
            {
                entity.HasKey(e => new { e.IdUsuario, e.IdCurso })
                    .HasName("CARRITO_PK");

                entity.ToTable("CARRITO");

                entity.Property(e => e.Precioactual).HasColumnName("PRECIOACTUAL");

                entity.HasOne(d => d.IdCursoNavigation)
                    .WithMany(p => p.Carritos)
                    .HasForeignKey(d => d.IdCurso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Carrito_FK2");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Carritos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Carrito_FK1");
            });

            modelBuilder.Entity<Curso>(entity =>
            {
                entity.HasKey(e => e.IdCurso);

                entity.ToTable("CURSO");

                entity.HasOne(d => d.ProfesorNavigation)
                    .WithMany(p => p.Cursos)
                    .HasForeignKey(d => d.Profesor)
                    .HasConstraintName("FK_PROFESOR");
            });

            modelBuilder.Entity<Detallefactura>(entity =>
            {
                entity.HasKey(e => new { e.NoFactura, e.IdCurso })
                    .HasName("DETALLEFACTURA_PK");

                entity.ToTable("DETALLEFACTURA");

                entity.Property(e => e.Precioactual).HasColumnName("PRECIOACTUAL");

                entity.HasOne(d => d.IdCursoNavigation)
                    .WithMany(p => p.Detallefacturas)
                    .HasForeignKey(d => d.IdCurso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Curso_FK");

                entity.HasOne(d => d.NoFacturaNavigation)
                    .WithMany(p => p.Detallefacturas)
                    .HasForeignKey(d => d.NoFactura)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Factura_FK");
            });

            modelBuilder.Entity<Factura>(entity =>
            {
                entity.HasKey(e => e.NoFactura)
                    .HasName("FACTURA_PK");

                entity.ToTable("FACTURA");

                entity.Property(e => e.Fecha).HasColumnType("datetime");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Facturas)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("Usuario_FK");
            });

            modelBuilder.Entity<Leccion>(entity =>
            {
                entity.HasKey(e => e.IdLeccion)
                    .HasName("PK_Leccion");

                entity.ToTable("LECCION");

                entity.HasOne(d => d.IdCursoNavigation)
                    .WithMany(p => p.Leccions)
                    .HasForeignKey(d => d.IdCurso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_IdCurso");
            });

            modelBuilder.Entity<Preguntum>(entity =>
            {
                entity.HasKey(e => e.IdPregunta)
                    .HasName("PK_Pregunta");

                entity.ToTable("PREGUNTA");

                entity.HasOne(d => d.IdLeccionNavigation)
                    .WithMany(p => p.Pregunta)
                    .HasForeignKey(d => d.IdLeccion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_IdLeccion");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Pregunta)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_IdUsuario");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK_Usuario");

                entity.ToTable("USUARIO");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
//"Server=DESKTOP-UUF85QJ\\SQLEXPRESS;Database=DataBaseAPI;user=PlusTi;password=12345678"
//"Server=DESKTOP-UUF85QJ\\SQLEXPRESS;Database=DBAPIREST;user=PlusTi;password=12345678"

