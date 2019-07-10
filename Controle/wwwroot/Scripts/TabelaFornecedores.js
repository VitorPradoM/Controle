$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/Fornecedores",
        success: function (resultado) {
            
       
            var container = document.getElementById("container");
            var valor = "<a href='Create.html'>Criar Fornecedor</a>"
            valor += "<table class='table'>";           
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
                valor += "<td><a onclick='EditarFornecedor(" + resultado[i].id + ")'/>Editar</td>";
                valor += "<td><a onclick='RemoveFornecedor(" + resultado[i].id + ")'/>Excluir</td>";
            
               
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
            valor += "<a onclick='Cadastrar(" + id+")'>Criar Novo Endereco</a>";
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
            for (var i = 0; i < resultado.length;i++) {
                valor += "<tr>";
                valor += "<td>" + resultado[i].pais + "</td>";
                valor += "<td>" + resultado[i].estado + "</td>";
                valor += "<td>" + resultado[i].cidade + "</td>";
                valor += "<td>" + resultado[i].bairro + "</td>";
                valor += "<td>" + resultado[i].numero + "</td>";
                valor += "<td>" + resultado[i].logradouro + "</td>";
                valor += "<td>" + resultado[i].cep + "</td>";

                valor += "<td><a onclick='editar(" + resultado[i].id + ")'>Editar</td>";
                valor += "<td><a onclick='remove(" + resultado[i].id + "," + id + ")'>Excluir</td>";
            }
            
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
        valor += "<div class='col-md-4'>"
        valor += "<label>Bairro</label>"
        valor += "<input type='text' id='Bairro' name='Bairro' value=''>"
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
            enderecos(id)
        }
    });
}

function editar(id) {

    $.ajax({
        type: "GET",
        url: "/api/Enderecos/" + id,
        data: JSON.stringify(id),
        success: function (resultado) {
            var container = document.getElementById("container");
            var valor = "<h1 class='titulo'>Editar Endereço Fornecedor</h1>"
            valor += "<div class='row' style='margin-left:45px'>"
            valor += "<div class='col-md-4'>"
            valor += "<label>Logradouro</label>"
            valor += "<input type='text' id='Logradouro' value=" + resultado.logradouro + " name='Logradouro' value=''>"
            valor += "</div>"
            valor += "<div class='col-md-4'>"
            valor += "<label>Bairro</label>"
            valor += "<input type='text' id='Bairro' name='Bairro' value='" + resultado.bairro + "'>"
            valor += "</div>"
            valor += "<div class='col-md-4'>"
            valor += "<label>Numero</label>"
            valor += "<input type='text' id='Numero' name='Numero' value='" + resultado.numero + "'>"
            valor += "</div>"
            valor += "<div class='col-md-4'>"
            valor += "<label>Cidade</label>"
            valor += "<input type='text' id='Cidade' name='Cidade' value='" + resultado.cidade + "'>"
            valor += "</div>"
            valor += "<div class='col-md-4'>"
            valor += "<label>Estado</label>"
            valor += "<input type='text' id='Estado' name='Estado' value='" + resultado.estado + "'>"
            valor += "</div>"
            valor += "<div class='col-md-4'>"
            valor += "<label>País</label>"
            valor += "<input type='text' id='Pais' name='Pais' value='" + resultado.pais + "'>"
            valor += "</div>"
            valor += "<div class='col-md-4'>"
            valor += "<label>Cep</label>"
            valor += "<input type='text' id='Cep' name='Cep' value='" + resultado.cep + "'>"
            valor += "</div>"
            valor += "<a onclick='edit(" + resultado.id + ")'>Cadastrar</a>"
            valor += "</div>"
            container.innerHTML = valor;
            
        }
    });
}
function edit(id) {

    var logradouro = $("#Logradouro").val();
    var bairro = $("#Bairro").val();
    var numero = $("#Numero").val();
    var cidade = $("#Cidade").val();
    var estado = $("#Estado").val();
    var pais = $("#Pais").val();
    var cep = $("#Cep").val();
    
    var Enderecos = {
        Id: id,
        Logradouro: logradouro,
        Bairro: bairro,
        Numero: numero,
        Cidade: cidade,
        Estado: estado,
        Pais: pais,
        Cep: cep
    };

    $.ajax({
        type: "PUT",
        accepts: "application/json",
        url: "/api/Enderecos/" + id,
        data: JSON.stringify(Enderecos),
        contentType: "application/json",      
        success: function (resultado) {

            location.reload();
        }
    });
}

function remove(id, resultado) {
    $.ajax({
        type: "DELETE",
        accepts: "application/json",
        url: "/api/Enderecos/" + resultado +"/"+id,
        data: JSON.stringify({resultado,id}),
        contentType: "application/json",
        success: function (resultado) {
            window.location.reload();
        }
    });

}

function RemoveFornecedor(id) {
    $.ajax({
        type: "DELETE",
        accepts: "application/json",
        url: "/api/Fornecedores/"+id,
        data: JSON.stringify({id}),
        contentType: "application/json",
        success: function (resultado) {
            window.location.reload();
        }
    });
}
function EditarFornecedor(id) {
    $.ajax({
        type: "GET",
        url: "/api/Fornecedores/" + id,
        data: JSON.stringify(id),
        success: function (resultado) {
            var container = document.getElementById("container");
            var valor = "<h1 class='titulo'>Editar  Fornecedor</h1>"
            valor += "<div class='row' style='margin-left:45px'>"
            valor += "<div class='col-md-4'>"
            valor += " <label>Nome</label>"
            valor += "<input type='text' id='Nome'  name='Nome' value='" + resultado.nome + "'>"
            valor += "</div>"
            valor += "<div class='col-md-4' id='cpfdiv'>"
            valor += "<label>CPF</label>"
            valor += "<input type='text' id='Cpf' name='Cpf' value='" + resultado.cpf + "'>"
            valor += "</div>" 
            valor += "<div class='col-md-4' id='cnpjdiv'>"
            valor += "<label>Cnpj</label>"
            valor += "<input type='text' id='Cnpj' name='Cnpj' value='" + resultado.cnpj + "'>"
            valor += "</div>" 
            valor += "<a onclick='EditarForne(" + resultado.id + ")'>Cadastrar</a>"
            valor += "</div>"
            container.innerHTML = valor;
            if (resultado.cpf == "") {
                $("#cpfdiv")[0].hidden = true;
                $("#cnpjdiv")[0].hidden = false;
            } else if (resultado.cnpj == "") {
                $("#cpfdiv")[0].hidden = false;
                $("#cnpjdiv")[0].hidden = true;
            }
        }
    });
}

function EditarForne(id) {

    var nome = $("#Nome").val();
    var cpf = $("#Cpf").val();
    var cnpj = $("#Cnpj").val();
  

    var Fornecedores = {
        Id: id,
        Nome: nome,
        Cpf: cpf,
        cnpj: cnpj    
    };

    $.ajax({
        type: "PUT",
        accepts: "application/json",
        url: "/api/Fornecedores/" + id,
        data: JSON.stringify(Fornecedores),
        contentType: "application/json",
        success: function (resultado) {

            location.reload();
        }
    });
}