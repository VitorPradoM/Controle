$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/Categorias_Produtos",
        success: function (resultado) {

            var container = document.getElementById("container");
            var valor = "<a href='Create.html'>Cadastrar Produto</a>"
            valor += "<table class='table'>";
            valor += "<thead class='thead-dark'>";
            valor += "<tr>";
            valor += "<th  scope='col'>id</th>";
            valor += "<th  scope='col'>Nome</th>";            
            valor += "<th scope='col'></th>";
            valor += "<th  scope='col'></th>";
            valor += "<th  scope='col'></th>";
            valor += "</tr>";
            valor += "</thead>";
            valor += "<tbody>";
            for (var i = 0; i < resultado.length; i++) {

                valor += "<tr>";
                valor += "<td>" + resultado[i].id + "</td>";
                valor += "<td>" + resultado[i].descricao + "</td>";                
                valor += "<td></td>";
                valor += "<td><a onclick='Edit(" + resultado[i].id + ")'/>Editar</td>";
                valor += "<td><a onclick='Remove(" + resultado[i].id + ")'/>Excluir</td>";


            }
            valor += "</tr>";
            valor += "</tbody>";
            valor += "</table>";
            container.innerHTML = valor;
        }
    });
});

function Edit(id) {


        $.ajax({
            type: "GET",
            url: "/api/Categorias_Produtos/" + id,
            data: JSON.stringify(id),
            success: function (resultado) {
                var container = document.getElementById("container");
                var valor = "<h1 class='titulo'>Editar  Fornecedor</h1>"
                valor += "<div class='row' style='margin-left:45px'>"
                valor += "<div class='col-md-4'>"
                valor += " <label>Descrição</label>"
                valor += "<input type='text' id='descricao'  name='descricao' value='" + resultado.descricao + "'>"
                valor += "</div>"
                valor += "<a onclick='alterar(" + resultado.id + ")'>Cadastrar</a>"
                valor += "</div>"
                container.innerHTML = valor;
               
            }
        });
    }



function alterar(id) {
    var descricao = $("#descricao").val();
    var cpf = $("#Cpf").val();
    var cnpj = $("#Cnpj").val();
    

    var Categorias_Produtos = {
        Id: id,
        Descricao: descricao 
    };

    $.ajax({
        type: "PUT",
        accepts: "application/json",
        url: "/api/Categorias_Produtos/" + id,
        data: JSON.stringify(Categorias_Produtos),
        contentType: "application/json",
        success: function (resultado) {

            location.reload();
        }
    });

}
function Remove(id) {


    $.ajax({
        type: "DELETE",
        accepts: "application/json",
        url: "/api/Categorias_Produtos/" + id,
        data: JSON.stringify({ "Id": id }),
        contentType: "application/json",
        success: function (resultado) {
            window.location.reload();
        }
    });
}