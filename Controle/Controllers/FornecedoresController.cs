using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Controle.Context;
using Controle.Models;
using Org.BouncyCastle.Asn1;

namespace Controle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedoresController : ControllerBase
    {
        private readonly contexto _context;

        public FornecedoresController(contexto context)
        {
            _context = context;
        }

        // GET: api/Fornecedores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fornecedores>>> GetFornecedores()
        {
            return await _context.Fornecedores.ToListAsync();
        }

        // GET: api/Fornecedores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Fornecedores>> GetFornecedores(int id)
        {
            var fornecedores = await _context.Fornecedores.FindAsync(id);

            if (fornecedores == null)
            {
                return NotFound();
            }

            return fornecedores;
        }

        // PUT: api/Fornecedores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFornecedores(int id, Fornecedores fornecedores)
        {
            if (id != fornecedores.Id)
            {
                return BadRequest();
            }

            _context.Entry(fornecedores).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FornecedoresExists(id))
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

        // POST: api/Fornecedores
        [HttpPost]
        public async Task<ActionResult<Fornecedores>> PostFornecedores(Endereco_FornecedorViewModel endereco_FornecedorViewModel)
        {
            Endereco_Fornecedor endereco_Fornecedor = new Endereco_Fornecedor();

          
            var Fornecedor =_context.Fornecedores.Add(endereco_FornecedorViewModel.fornecedores);
            var Endereco = _context.Enderecos.Add(endereco_FornecedorViewModel.enderecos);

            await _context.SaveChangesAsync();

            endereco_Fornecedor.Endereco_Id = endereco_FornecedorViewModel.enderecos.Id;
            endereco_Fornecedor.Fornecedor_Id = endereco_FornecedorViewModel.fornecedores.Id;

            _context.Entry(endereco_FornecedorViewModel.enderecos).State = EntityState.Unchanged;
            _context.Endereco_Fornecedor.Add(endereco_Fornecedor);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetFornecedores", new { id = endereco_Fornecedor.Fornecedor_Id  }, endereco_Fornecedor);
        }

        // DELETE: api/Fornecedores/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Fornecedores>> DeleteFornecedores(int id)
        {
            var fornecedores = await _context.Fornecedores.FindAsync(id);
            if (fornecedores == null)
            {
                return NotFound();
            }

            _context.Fornecedores.Remove(fornecedores);
            await _context.SaveChangesAsync();

            return fornecedores;
        }

        private bool FornecedoresExists(int id)
        {
            return _context.Fornecedores.Any(e => e.Id == id);
        }
    }
}
