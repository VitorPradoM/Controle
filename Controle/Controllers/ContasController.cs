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
