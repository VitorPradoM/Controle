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
            bool verifica = false;
            if (fornecedores.Cpf != "")
            {
                verifica = Verifica_Cpf(fornecedores.Cpf);
            }else if (fornecedores.Cnpj != "")
            {
                verifica = Verifica_Cnpj(fornecedores.Cnpj);
            }
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
            Boolean verifica = false;
            if (endereco_FornecedorViewModel.enderecos.Pais !=""  && endereco_FornecedorViewModel.enderecos.Estado != "" && endereco_FornecedorViewModel.enderecos.Cidade != "" && endereco_FornecedorViewModel.enderecos.Bairro != "" && endereco_FornecedorViewModel.enderecos.Cep != "" && endereco_FornecedorViewModel.enderecos.Cep != "" ) {
                if (endereco_FornecedorViewModel.fornecedores.Cpf != "")
                {
                    verifica = Verifica_Cpf(endereco_FornecedorViewModel.fornecedores.Cpf);

                }
                else if (endereco_FornecedorViewModel.fornecedores.Cnpj != "")
                {
                    verifica = Verifica_Cnpj(endereco_FornecedorViewModel.fornecedores.Cnpj);
                }

                if (verifica == true)
                {
                    var Fornecedor = _context.Fornecedores.Add(endereco_FornecedorViewModel.fornecedores);
                    var Endereco = _context.Enderecos.Add(endereco_FornecedorViewModel.enderecos);

                    await _context.SaveChangesAsync();

                    endereco_Fornecedor.Endereco_Id = endereco_FornecedorViewModel.enderecos.Id;
                    endereco_Fornecedor.Fornecedor_Id = endereco_FornecedorViewModel.fornecedores.Id;

                    _context.Entry(endereco_FornecedorViewModel.enderecos).State = EntityState.Unchanged;
                    _context.Endereco_Fornecedor.Add(endereco_Fornecedor);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetFornecedores", new { id = endereco_Fornecedor.Fornecedor_Id }, endereco_Fornecedor);
                }
                else
                {

                    return Content("CPF/CNPJ invalido");
                }
            }
            else
            {
                return Content("Todo campos obrigatórios devem ser preenchidos");
            }
        }
        //[HttpPost]
        //public async Task<ActionResult<Fornecedores>> Edit(Endereco_FornecedorViewModel endereco_FornecedorViewModel)
        //{

        //}

        // DELETE: api/Fornecedores/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Fornecedores>> DeleteFornecedores(int id)
        {
            List<Endereco_Fornecedor> endereco_fornecedores = new List<Endereco_Fornecedor>();
            endereco_fornecedores = await _context.Endereco_Fornecedor.Where(f => f.Fornecedor_Id == id).ToListAsync();
            var fornecedores = await _context.Fornecedores.FindAsync(id);
            if (fornecedores == null)
            {
                return NotFound();
            }
            for (int i = 0; i < endereco_fornecedores.Count(); i++)
            {
                _context.Endereco_Fornecedor.Remove(endereco_fornecedores[i]);
            }

            _context.Fornecedores.Remove(fornecedores);
            await _context.SaveChangesAsync();

            return fornecedores;
        }

        private bool FornecedoresExists(int id)
        {
            return _context.Fornecedores.Any(e => e.Id == id);
        }
        private bool Verifica_Cpf(string cpf)
        {
            int[] multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string tempCpf;
            string digito;
            int soma;
            int resto;
            cpf = cpf.Trim();
            cpf = cpf.Replace(".", "").Replace("-", "");
            if (cpf.Length != 11)
                return false;
            tempCpf = cpf.Substring(0, 9);
            soma = 0;

            for (int i = 0; i < 9; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = resto.ToString();
            tempCpf = tempCpf + digito;
            soma = 0;
            for (int i = 0; i < 10; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = digito + resto.ToString();
            return cpf.EndsWith(digito);

        }

        private bool Verifica_Cnpj(string cnpj)
        {
            int[] multiplicador1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int soma;
            int resto;
            string digito;
            string tempCnpj;
            cnpj = cnpj.Trim();
            cnpj = cnpj.Replace(".", "").Replace("-", "").Replace("/", "");
            if (cnpj.Length != 14)
                return false;
            tempCnpj = cnpj.Substring(0, 12);
            soma = 0;
            for (int i = 0; i < 12; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador1[i];
            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = resto.ToString();
            tempCnpj = tempCnpj + digito;
            soma = 0;
            for (int i = 0; i < 13; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador2[i];
            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = digito + resto.ToString();
            return cnpj.EndsWith(digito);
        }
    }
}