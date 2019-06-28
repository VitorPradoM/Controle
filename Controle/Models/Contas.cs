using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Controle.Models
{
    public class Contas
    {
        public int Id { get; set; }

        [Display(Name = "Descrição")]
        public string Descricao { get; set; }

        [Display(Name = "Preço")]
        public float Preco { get; set; }
      
        public string Status_Pagamento { get; set; }

        public string Data_Vencimento { get; set; }

        public int Categorias_Id { get; set; }

    }
}
