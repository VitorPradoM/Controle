using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controle.Models
{
    public class Produtos
    {
        public int Id { get; set; }

     
        public string Nome { get; set; }

        public int Quantidade { get; set; }

        public float Valor { get; set; }

        public int Categoria_Produto_Id { get; set; }

        public int Fornecedor_Id { get; set; }
    }
}
