using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Controle.Context;
using Controle.Models;

namespace Controle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContasController : ControllerBase
    {
        private readonly contexto _context;

        public ContasController(contexto context)
        {
            _context = context;
        }

        // GET: api/Contas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contas>>> Getcontas()
        {
          

            return await _context.contas.ToListAsync(); 
        }

        // GET: api/Contas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contas>> GetContas(int id)
        {
            var contas = await _context.contas.FindAsync(id);

            if (contas == null)
            {
                return NotFound();
            }

            return contas;
        }

       



        // Esse aqui queria  quero que ele aceita requisição do contajs função pesquisa

        [HttpPost("Pesquisa")]
        public async Task<ActionResult<List<Contas>>> Pequisa(ContasViewModel contas)
        {
            List<Contas> valor = new List<Contas>();

            {
                // Descrição Todas Opções
                if (contas.Descricao != "" && contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento == "" && contas.Categorias_Id == "")
                {
                    valor = await _context.contas.Where(c => c.Descricao == contas.Descricao).ToListAsync();
                }
                else if (contas.Descricao != "" && contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento != "" && contas.Categorias_Id == "")
                {
                    valor = await _context.contas.Where(c => c.Descricao == contas.Descricao && c.Status_Pagamento == contas.Status_Pagamento).ToListAsync();
                }
                else if (contas.Descricao != "" && contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento == "" && contas.Categorias_Id != "")
                {
                    valor = await _context.contas.Where(c => c.Descricao == contas.Descricao && c.Categorias_Id.ToString() == contas.Categorias_Id).ToListAsync();
                }
                else if (contas.Descricao != "" && !contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento == "" && contas.Categorias_Id == "")
                {
                    valor = await _context.contas.Where(c => c.Descricao == contas.Descricao && c.Data_Vencimento >= contas.Data_Inicio && c.Data_Vencimento <= contas.Data_Final).ToListAsync();
                }
                if (contas.Descricao != "" && contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento != "" && contas.Categorias_Id != "")
                {
                    valor = await _context.contas.Where(c => c.Descricao == contas.Descricao && c.Status_Pagamento == contas.Status_Pagamento && c.Categorias_Id.ToString() == contas.Categorias_Id).ToListAsync();
                }
                if (contas.Descricao != "" && !contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento != "" && contas.Categorias_Id == "")
                {
                    valor = await _context.contas.Where(c => c.Descricao == contas.Descricao && c.Status_Pagamento == contas.Status_Pagamento && c.Data_Vencimento >= contas.Data_Inicio && c.Data_Vencimento <= contas.Data_Final).ToListAsync();
                }
                if (contas.Descricao != "" && !contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento == "" && contas.Categorias_Id != "")
                {
                    valor = await _context.contas.Where(c => c.Descricao == contas.Descricao && c.Status_Pagamento == contas.Status_Pagamento && c.Categorias_Id.ToString() == contas.Categorias_Id && c.Data_Vencimento <= contas.Data_Final).ToListAsync();
                }
                if (contas.Descricao != "" && !contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento == "" && contas.Categorias_Id != "")
                {
                    valor = await _context.contas.Where(c => c.Descricao == contas.Descricao && c.Status_Pagamento == contas.Status_Pagamento && c.Categorias_Id.ToString() == contas.Categorias_Id && c.Data_Vencimento <= contas.Data_Final).ToListAsync();
                }
                if (contas.Descricao == "" && !contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento != "" && contas.Categorias_Id != "")
                {
                    valor = await _context.contas.Where(c => c.Status_Pagamento == contas.Status_Pagamento && c.Categorias_Id.ToString() == contas.Categorias_Id && c.Data_Vencimento <= contas.Data_Final).ToListAsync();
                }
                // Categorias_ID  Opções
                if (contas.Descricao == "" && contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento == "" && contas.Categorias_Id != "")
                {
                    valor = await _context.contas.Where(c => c.Categorias_Id.ToString() == contas.Categorias_Id).ToListAsync();
                }
                else if (contas.Descricao == "" && contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento != "" && contas.Categorias_Id != "")
                {
                    valor = await _context.contas.Where(c => c.Categorias_Id.ToString() == contas.Categorias_Id && c.Status_Pagamento == contas.Status_Pagamento).ToListAsync();
                }
                else if (contas.Descricao == "" && !contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento == "" && contas.Categorias_Id != "")
                {
                    valor = await _context.contas.Where(c => c.Categorias_Id.ToString() == contas.Categorias_Id && c.Data_Vencimento >= contas.Data_Inicio && c.Data_Vencimento <= contas.Data_Final).ToListAsync();
                }


                // Status_Pagamento  Opções
                if (contas.Descricao == "" && contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento != "" && contas.Categorias_Id == "")
                {
                    valor = await _context.contas.Where(c => c.Status_Pagamento == contas.Status_Pagamento).ToListAsync();
                }
                else if (contas.Descricao == "" && !contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento != "" && contas.Categorias_Id == "")
                {
                    valor = await _context.contas.Where(c => c.Status_Pagamento == contas.Status_Pagamento && c.Data_Vencimento >= contas.Data_Inicio && c.Data_Vencimento <= contas.Data_Final).ToListAsync();
                }
                // Data
                else if (contas.Descricao == "" && !contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento == "" && contas.Categorias_Id == "")
                {
                    valor = await _context.contas.Where(c => c.Data_Vencimento >= contas.Data_Inicio && c.Data_Vencimento <= contas.Data_Final).ToListAsync();
                }
                else if (contas.Descricao != "" && !contas.Data_Inicio.ToString().Contains("01/01/0001") && contas.Status_Pagamento != "" && contas.Categorias_Id != "")
                {
                    valor = await _context.contas.Where(c => c.Categorias_Id.ToString() == contas.Categorias_Id && c.Data_Vencimento >= contas.Data_Inicio && c.Data_Vencimento <= contas.Data_Final && c.Status_Pagamento == contas.Status_Pagamento && c.Descricao == contas.Descricao).ToListAsync();
                }
            }
            return valor;
        }
        // PUT: api/Contas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContas(int id, Contas contas)
        {
            if (id != contas.Id)
            {
                return BadRequest();
            }

            _context.Entry(contas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Contas
        [HttpPost]
        public async Task<ActionResult<Contas>> PostContas(Contas contas)
        {
            _context.contas.Add(contas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContas", new { id = contas.Id }, contas);
        }

        // DELETE: api/Contas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Contas>> DeleteContas(int id)
        {
            var contas = await _context.contas.FindAsync(id);
            if (contas == null)
            {
                return NotFound();
            }

            _context.contas.Remove(contas);
            await _context.SaveChangesAsync();

            return contas;
        }

        private bool ContasExists(int id)
        {
            return _context.contas.Any(e => e.Id == id);
        }
    }
}
