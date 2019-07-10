using Controle.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controle.Context
{
    public class contexto: DbContext
    {

  

        public contexto(DbContextOptions<contexto> options) : base(options)
        {
            
        }
        public virtual DbSet<Contas> contas { get; set; }
        public virtual DbSet<Categorias> categorias { get; set; }
        public virtual DbSet<Produtos> produtos { get; set; }
        public virtual DbSet<Categorias_Produtos> categorias_produtos { get; set; }
        public virtual DbSet<Enderecos> Enderecos { get; set; }
        public virtual DbSet<Fornecedores> Fornecedores { get; set; }
        public virtual DbSet<Endereco_Fornecedor> Endereco_Fornecedor { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
            builder.Entity<Endereco_Fornecedor>()
            .HasKey(t => new { t.Endereco_Id, t.Fornecedor_Id });
        }

        }
    }
