﻿using System;
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
    public class ProdutosController : ControllerBase
    {
        private readonly contexto _context;

        public ProdutosController(contexto context)
        {
            _context = context;
        }

        // GET: api/Produtos
        [HttpGet]
        public async Task<ActionResult<List<Produtos_ViewModel>>> Getprodutos()
        {
            List<Produtos_ViewModel> produtos_viewmodel = new List<Produtos_ViewModel>();
           
            var produtos = await _context.produtos.ToListAsync();
            for (int i=0;i<produtos.Count();i++)
            {
                Produtos_ViewModel produtos_model = new Produtos_ViewModel();
                var nome = await _context.categorias_produtos.Where(p=>p.Id == produtos[i].Categoria_Produto_Id).ToListAsync();
                var descricao = await _context.Fornecedores.Where(p=>p.Id == produtos[i].Fornecedor_Id).ToListAsync();
                produtos_model.produtos = produtos[i];
                produtos_model.Categoria_Produto = nome[0].Descricao.ToString();
                produtos_model.Fornecedor = descricao[0].Nome.ToString();
                produtos_viewmodel.Add(produtos_model);
            }
            return produtos_viewmodel;
        }

// GET: api/Produtos/5
[HttpGet("{id}")]
        public async Task<ActionResult<Produtos>> GetProdutos(int id)
        {
            var produtos = await _context.produtos.FindAsync(id);

            if (produtos == null)
            {
                return NotFound();
            }

            return produtos;
        }

        // PUT: api/Produtos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProdutos(int id, Produtos produtos)
        {
            if (id != produtos.Id)
            {
                return BadRequest();
            }

            _context.Entry(produtos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutosExists(id))
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

        // POST: api/Produtos
        [HttpPost]
        public async Task<ActionResult<Produtos>> PostProdutos(Produtos produtos)
        {
            _context.produtos.Add(produtos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProdutos", new { id = produtos.Id }, produtos);
        }

        // DELETE: api/Produtos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Produtos>> DeleteProdutos(int id)
        {
            var produtos = await _context.produtos.FindAsync(id);
            if (produtos == null)
            {
                return NotFound();
            }

            _context.produtos.Remove(produtos);
            await _context.SaveChangesAsync();

            return produtos;
        }

        private bool ProdutosExists(int id)
        {
            return _context.produtos.Any(e => e.Id == id);
        }
    }
}
