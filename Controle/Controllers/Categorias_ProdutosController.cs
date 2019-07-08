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
    public class Categorias_ProdutosController : ControllerBase
    {
        private readonly contexto _context;

        public Categorias_ProdutosController(contexto context)
        {
            _context = context;
        }

        // GET: api/Categorias_Produtos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categorias_Produtos>>> Getcategoria_produtos()
        {
            return await _context.categoria_produtos.ToListAsync();
        }

        // GET: api/Categorias_Produtos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Categorias_Produtos>> GetCategorias_Produtos(int id)
        {
            var categorias_Produtos = await _context.categoria_produtos.FindAsync(id);

            if (categorias_Produtos == null)
            {
                return NotFound();
            }

            return categorias_Produtos;
        }

        // PUT: api/Categorias_Produtos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategorias_Produtos(int id, Categorias_Produtos categorias_Produtos)
        {
            if (id != categorias_Produtos.Id)
            {
                return BadRequest();
            }

            _context.Entry(categorias_Produtos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Categorias_ProdutosExists(id))
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

        // POST: api/Categorias_Produtos
        [HttpPost]
        public async Task<ActionResult<Categorias_Produtos>> PostCategorias_Produtos(Categorias_Produtos categorias_Produtos)
        {
            _context.categoria_produtos.Add(categorias_Produtos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategorias_Produtos", new { id = categorias_Produtos.Id }, categorias_Produtos);
        }

        // DELETE: api/Categorias_Produtos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Categorias_Produtos>> DeleteCategorias_Produtos(int id)
        {
            var categorias_Produtos = await _context.categoria_produtos.FindAsync(id);
            if (categorias_Produtos == null)
            {
                return NotFound();
            }

            _context.categoria_produtos.Remove(categorias_Produtos);
            await _context.SaveChangesAsync();

            return categorias_Produtos;
        }

        private bool Categorias_ProdutosExists(int id)
        {
            return _context.categoria_produtos.Any(e => e.Id == id);
        }
    }
}
