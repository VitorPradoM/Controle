$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/Fornecedores",
        success: function (resultado) {


            var container = document.getElementById("container");
            var valor = "<table class='table'>"
            valor += "<thead class='thead-dark'>";
            valor += "<tr>";
            valor += "<th  scope='col'>id</th>";
            valor += "<th  scope='col'>Nome</th>";
            valor += "<th  scope='col'>CNPJ</th>";
            valor += "<th  scope='col'>CPF</th>";
            valor += "<th scope='col'>Endereços</th>";
            valor += "<th scope='col'></th>";
            valor += "<th  scope='col'></th>";
            valor += "</tr>";
            valor += "</thead>";
            valor += "<tbody>";
            for (var i = 0; i < resultado.length; i++) {
               
                valor += "<tr>";
                valor += "<td>" + resultado[i].id + "</td>";
                valor += "<td>" + resultado[i].nome + "</td>";
                valor += "<td>" + resultado[i].cnpj + "</td>";
                valor += "<td>" + resultado[i].cpf + "</td>";
                valor += "<td><a class='nome'  onclick='enderecos(" + resultado[i].id +")'/>Enderecos</td>";
                valor += "<td><a onclick='editar(" + resultado[i].id + ")'/>Editar</td>";
                valor += "<td><a onclick='Remove(" + resultado[i].id + ")'/>Excluir</td>";
            
               
               }
               valor += "</tr>";
               valor += "</tbody>";
               valor += "</table>";
               container.innerHTML = valor;
        }
    });
});

function enderecos(id) {
  
    $.ajax({
        type: "GET",
        url: "/api/Enderecos/BuscaEndereco/"+ id,     
        data: id,
        success: function (resultado) {

            console.log(resultado);
            var container = document.getElementById("container");
            var valor = "<h1>Endereços do forncedor </h1>"
            valor += "<a  onclick='Cadastrar("+id+")'>Cradastrar Novo Endereço</td>",
            valor += "<table class='table'>"
            valor += "<thead class='thead-dark'>";
            valor += "<tr>";
            valor += "<th  scope='col'>País</th>";
            valor += "<th  scope='col'>Estado</th>";
            valor += "<th  scope='col'>Cidade</th>";
            valor += "<th  scope='col'>Bairro</th>";
            valor += "<th  scope='col'>Numero</th>";
            valor += "<th  scope='col'>Logradouro</th>";
            valor += "<th  scope='col'>Cep</th>";
            valor += "<th  scope='col'></th>";
            valor += "<th  scope='col'></th>";
            valor += "</tr>";
            valor += "</thead>";
            valor += "<tbody>";
          
                             
                valor += "<tr>";
                valor += "<td>" + resultado.pais + "</td>";
                valor += "<td>" + resultado.estado + "</td>";
                valor += "<td>" + resultado.cidade + "</td>";
                valor += "<td>" + resultado.bairro + "</td>";
                valor += "<td>" + resultado.numero + "</td>";
                valor += "<td>" + resultado.logradouro + "</td>";
                valor += "<td>" + resultado.cep + "</td>";
               
                valor += "<td><a onclick='editar(" + resultado.id + ")'>Editar</td>";
                valor += "<td><a onclick='Remove(" + resultado.id + ")'>Excluir</td>";

            
            valor += "</tr>";
            valor += "</tbody>";
            valor += "</table>";
            container.innerHTML = valor;
        }


    });
}

function Cadastrar(id) {
    var container = document.getElementById("container");
     var valor = "<h1 class='titulo'>Cadastrar Endereço Fornecedor</h1>"
     valor += "<div class='row' style='margin-left:45px'>"
        valor += "<div class='col-md-4'>"
        valor += "<label>Logradouro</label>"
        valor +="<input type='text' id='Logradouro' name='Logradouro' value=''>"
        valor +="</div>"
        valor +="<div class='col-md-4>"
        valor += "<label>Bairro</label>"
        valor += "<input type='text' id='Bairro' name='Bairro' value='''>"
        valor += "</div>"
        valor += "<div class='col-md-4'>"
        valor += "<label>Numero</label>"
        valor += "<input type='text' id='Numero' name='Numero' value=''>"
        valor += "</div>"
        valor +="<div class='col-md-4'>"
        valor += "<label>Cidade</label>"
        valor += "<input type='text' id='Cidade' name='Cidade' value=''>"
        valor += "</div>"
        valor += "<div class='col-md-4'>"
        valor += "<label>Estado</label>"
        valor +="<input type='text' id='Estado' name='Estado' value=''>"
        valor +="</div>"
        valor += "<div class='col-md-4'>"
        valor += "<label>País</label>"
        valor += "<input type='text' id='Pais' name='Pais' value=''>"
        valor +=  "</div>"
        valor +=  "<div class='col-md-4'>"
        valor +=  "<label>Cep</label>"
        valor += "<input type='text' id='Cep' name='Cep' value=''>"
        valor += "</div>"
        valor += "<a onclick='finalizar("+id+")'>Cadastrar</a>"
        valor += "</div>"
    container.innerHTML = valor;
}

function finalizar(id) {
   
    var logradouro = $("#Logradouro").val();
    var bairro = $("#Bairro").val();
    var numero = $("#Numero").val();
    var cidade = $("#Cidade").val();
    var estado = $("#Estado").val();
    var pais = $("#Pais").val();
    var cep = $("#Cep").val();

    var Enderecos = {
        Logradouro: logradouro,
        Bairro: bairro,
        Numero: numero,
        Cidade: cidade,
        Estado: estado,
        Pais: pais,
        Cep: cep
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: "/api/Enderecos/"+id,
        data: JSON.stringify(Enderecos, id),
        contentType: "application/json",
        success: function (resultado) {
        }
    });
}