$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/Produtos",
        success: function (resultado) {

            console.log(resultado);
            var container = document.getElementById("container");
            var valor = "<a href='Create.html'>Cadastrar Produto</a>"
            valor += "<table class='table'>";
            valor += "<thead class='thead-dark'>";
            valor += "<tr>";
            valor += "<th  scope='col'>id</th>";
            valor += "<th  scope='col'>Nome</th>";
            valor += "<th  scope='col'>Quantidade</th>";
            valor += "<th  scope='col'>Valor</th>";
            valor += "<th  scope='col'>Fornecedor</th>";
            valor += "<th  scope='col'>Categoria do Produto</th>";
            valor += "<th scope='col'></th>";
            valor += "<th  scope='col'></th>";
            valor += "<th  scope='col'></th>";
            valor += "</tr>";
            valor += "</thead>";
            valor += "<tbody>";
            for (var i = 0; i < resultado.length; i++) {
                valor += "<tr>";
                valor += "<td>" + resultado[i].produtos.id + "</td>";
                valor += "<td>" + resultado[i].produtos.nome + "</td>";
                valor += "<td>" + resultado[i].produtos.quantidade + "</td>";
                valor += "<td>" + resultado[i].produtos.valor + "</td>";
                valor += "<td>" + resultado[i].fornecedor + "</td>";
                valor += "<td>" + resultado[i].categoria_Produto + "</td>";
                valor += "<td></td>";             
                valor += "<td><a onclick='EditarProduto(" + resultado[i].produtos.id + ")'/>Editar</td>";
                valor += "<td><a onclick='RemoveProduto(" + resultado[i].produtos.id + ")'/>Excluir</td>";

            }
            valor += "</tr>";
            valor += "</tbody>";
            valor += "</table>";
            container.innerHTML = valor;
        }
    });
});

function RemoveProduto(id) 
{
    $.ajax({
        type: "DELETE",
        accepts: "application/json",
        url: "/api/Produtos/" + id,
        data: JSON.stringify({ id }),
        contentType: "application/json",
        success: function (resultado) {
            window.location.reload();
        }
    });
}
function EditarProduto(id) {
    $.ajax({
        type: "GET",
        url: "/api/Produtos/" + id,
        data: JSON.stringify(id),
        success: function (resultado) {
            console.log(resultado);
            var container = document.getElementById("container");
            var valor = "<h1 class='titulo'>Editar Endereço Fornecedor</h1>"
            valor += "<div class='row' style='margin-left:45px'>"
            valor += "<div class='col-md-4'>"
            valor += "<label>Nome Produto</label>"
            valor += "<input type='text' id='nome' value=" + resultado.nome + " name='nome' value=''>"
            valor += "</div>"
            valor += "<div class='col-md-4'>"
            valor += "<label>Quantidade</label>"
            valor += "<input type='text' id='quantidade' name='quantidade' value='" + resultado.quantidade + "'>"
            valor += "</div>"
            valor += "<div class='col-md-4'>"
            valor += "<label>Valor</label>"
            valor += "<input type='text' id='valor' name='valor' value='" + resultado.valor + "'>"
            valor += "</div>"
            valor += "<div class='col-md-4' id='Fornecedores'>"
            valor +="</div>"
            valor +="<div class='col-md-4' id='Categoria'>"
            valor +="</div>"
            valor += "<a onclick='alterar(" + resultado.id + ")'>Finalizar</a>"
            valor += "</div>"
            container.innerHTML = valor;
            fornecedores(resultado.fornecedor_Id);
            Categorias(resultado.categoria_Produto_Id);
        }
    });
}
function fornecedores(id) {
    $.ajax({
        type: "GET",
        url: "/api/Fornecedores",
        success: function (resultado) {
            console.log(resultado);
            var opcoes = "<label>Fornecedores</label>";
            opcoes += "<select id='fornecedores' name='select'>";
            opcoes += "<option value='' selected>Selecione</option>;"
            for (var i = 0; i < resultado.length; i++) {
                if (resultado[i].id == id) {
                    opcoes += "<option selected value=" + resultado[i].id + ">" + resultado[i].nome + "</option>"
                } else {
                    opcoes += "<option value=" + resultado[i].id + ">" + resultado[i].nome + "</option>"
                }
            }
            opcoes += "</select>";
            Fornecedores.innerHTML = opcoes;

        }
    });


}

function Categorias(id) {
    $.ajax({
        type: "GET",
        url: "/api/Categorias_Produtos",
        success: function (resultado) {
            console.log(resultado);
            var opcoes = "<label>Categorias</label>";
            opcoes += "<select id='categorias' name='select'>";
            opcoes += "<option value='' selected>Selecione</option>;"
            for (var i = 0; i < resultado.length; i++) {
                if (resultado[i].id == id) {
                    opcoes += "<option selected value=" + resultado[i].id + ">" + resultado[i].descricao + "</option>"
                } else {
                    opcoes += "<option value=" + resultado[i].id + ">" + resultado[i].descricao + "</option>"
                }
            }
            opcoes += "</select>";
            Categoria.innerHTML = opcoes;
        }
    });
}
function alterar(id) {

    var nome = $("#nome").val();
    var quantidade = $("#quantidade").val();
    var valor = $("#valor").val();
    var id_fornecedor = $("#fornecedores")[0].value;
    var categoria_produto_id = $("#categorias")[0].value;

    var Produtos = {
        Id: id,
        Nome: nome,
        Quantidade: quantidade,
        Valor: valor,
        Fornecedor_Id: id_fornecedor,
        Categoria_Produto_Id: categoria_produto_id
    };

    $.ajax({
        type: "PUT",
        accepts: "application/json",
        url: "/api/Produtos/" + id,
        data: JSON.stringify(Produtos),
        contentType: "application/json",
        success: function (resultado) {

            location.reload();
        }
    });
}