using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controle.Models
{
    public class Endereco_FornecedorViewModel
    {

        public int Endereco_Id { get; set; }
        public virtual Enderecos enderecos { get; set; }

        public int Fornecedor_Id { get; set; }
        public virtual Fornecedores fornecedores { get; set; }
    }
}
