﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Controle.Controllers
{
    
    public class ComunicacaoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

       
        public IActionResult Edit()
        {
            return View();
        }
    }
}