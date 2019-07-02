using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Controle.Controllers
{
    public class ComunicaController : Controller
    {
         [HttpGet("Index")]
        public ActionResult Index()
        {
            return View();
        }

        // GET: Comunica/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Comunica/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Comunica/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Comunica/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Comunica/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Comunica/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Comunica/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}