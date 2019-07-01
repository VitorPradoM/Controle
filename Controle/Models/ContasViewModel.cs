using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controle.Models
{
    public class ContasViewModel
    {        
        public string Descricao { get; set; }
       
        public float Preco { get; set; }

        public string Status_Pagamento { get; set; }

        public DateTime Data_Inicio { get; set; }

        public DateTime Data_Final { get; set; }

        public string Categorias_Id { get; set; }

    }
}
