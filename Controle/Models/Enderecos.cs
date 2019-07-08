using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controle.Models
{
    public class Enderecos
    {
        public int Id { get; set; }

        public string Logradouro { get; set; }

        public string Bairro { get; set; }
         
        public int Numero { get; set; }

        public string Cidade { get; set; }

        public string Estado { get; set; }

        public string Pais { get; set; }

        public string Cep { get; set; }

    }
}
