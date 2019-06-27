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
    }
}
