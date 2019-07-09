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
    public class EnderecosController : ControllerBase
    {
        private readonly contexto _context;

        public EnderecosController(contexto context)
        {
            _context = context;
        }

        // GET: api/Enderecos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enderecos>>> GetEnderecos()
        {
            return await _context.Enderecos.ToListAsync();
        }

        // GET: api/Enderecos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Enderecos>> GetEnderecos(int id)
        {
            var enderecos = await _context.Enderecos.FindAsync(id);

            if (enderecos == null)
            {
                return NotFound();
            }

            return enderecos;
        }

        // PUT: api/Enderecos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnderecos(int id, Enderecos enderecos)
        {
            if (enderecos.Pais != "" && enderecos.Bairro != "" && enderecos.Estado != "" && enderecos.Cidade != "" && enderecos.Cep != "" && enderecos.Numero != 0)
            {
                if (id != enderecos.Id)
                {
                    return BadRequest();
                }

                _context.Entry(enderecos).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EnderecosExists(id))
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
            else
            {
                return Content("Devem ser preenchidos todos os campo obrigatórios");
            }
        }

        // POST: api/Enderecos
        [HttpPost("{id}")]
        public async Task<ActionResult<Enderecos>> PostEnderecos(Enderecos enderecos,int id)
        {
            if (enderecos.Pais !="" && enderecos.Bairro !="" && enderecos.Estado !="" && enderecos.Cidade != "" && enderecos.Cep != "" && enderecos.Numero != 0 ) {
                Endereco_Fornecedor endereco_fornecedor = new Endereco_Fornecedor();
                _context.Enderecos.Add(enderecos);
                await _context.SaveChangesAsync();
                endereco_fornecedor.Fornecedor_Id = id;
                endereco_fornecedor.Endereco_Id = enderecos.Id;
                _context.Endereco_Fornecedor.Add(endereco_fornecedor);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEnderecos", new { id = enderecos.Id }, enderecos);
            }
            else
            {
                return Content("Todos campos pedidos devem ser preenchidos");
            }
        }

        [HttpGet("BuscaEndereco/{id}")]
        public async Task<ActionResult<List<Enderecos>>> BuscaEndereco(int id)
        {
            List<Enderecos> enderecos = new List<Enderecos>();
            
             var fornecedores = await _context.Endereco_Fornecedor.Where(e=>e.Fornecedor_Id == id).ToListAsync();

            for (var i =0;i< fornecedores.Count();i++) {
              var endereco =_context.Enderecos.Where(e=>e.Id == fornecedores[i].Endereco_Id);
                enderecos.Add(endereco.First());
            }
            return  enderecos;
        }
       
        // DELETE: api/Enderecos/5
        [HttpDelete("{resultado}/{id}")]
        public async Task<ActionResult<Enderecos>> DeleteEnderecos(int resultado,int id)
        {
            var Fornecedores_endereco = await _context.Endereco_Fornecedor.Where(d=>d.Endereco_Id == id && d.Fornecedor_Id == resultado).ToListAsync();
           
            var endereco = await _context.Endereco_Fornecedor.Where(d => d.Endereco_Id == id).ToListAsync();
            var enderecos = await _context.Enderecos.FindAsync(id);

            for (int i=0;i< Fornecedores_endereco.Count();i++) {
                _context.Endereco_Fornecedor.Remove(Fornecedores_endereco[i]);
            }

            if (endereco.Count() == 1)
            {                
                if (enderecos == null)
                {
                    return NotFound();
                }
                _context.Enderecos.Remove(enderecos);
            }
            await _context.SaveChangesAsync();

            return enderecos;
        }

        private bool EnderecosExists(int id)
        {
            return _context.Enderecos.Any(e => e.Id == id);
        }
    }
}
