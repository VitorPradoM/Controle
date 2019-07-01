$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/Contas",
        success: function (resultado) {
            console.log(resultado);
            var container = document.getElementById("container");
            var valor = "<table>"
            valor += "<thead>";
            valor += "<table>";
            valor += "<thead>";
            valor += "<tr>";
            valor += "<th>id</th>";
            valor += "<th>Descrição</th>";
            valor += "<th>Preço</th>";
            valor += "<th>Categoria</th>";
            valor += "<th>Data Vencimento</th>";
            valor += "<th>Status Pagamentos</th>";
            valor += "<th></th>";
            valor += "</tr>";
            valor += "</thead>";
            valor += "<tbody>";
            for (var i = 0; i < resultado.length; i++) {
                valor += "<tr>";
                valor += "<td>" + resultado[i].id + "</td>";
                valor += "<td>" + resultado[i].descricao + "</td>";
                valor += "<td>" + resultado[i].preco + "</td>";
                valor += "<td>" + resultado[i].categorias_Id + "</td>";
                valor += "<td>" + resultado[i].data_Vencimento + "</td>";
                valor += "<td>" + resultado[i].status_Pagamento + "</td>";
                valor += "<td><a onclick='chamaedit(" + resultado[i].id + ")'>Edit</td>";
                valor += "</tr>";
            }
            valor += "</tbody>";
            valor += "</table>";
            container.innerHTML = valor;
        }
    });
});
function pesquisa() {
    var data_inicio = $("#Data_Inicial").val();
    var data_final = $("#Data_Final").val();

    if (data_inicio != "" && data_final != "") {
        ContasViewModel = {
            descricao: $("#Conta").val(),
            Status_Pagamento: $("#StatusPagamento").val(),
            Categorias_Id: $("#Categoria").val(),
            Data_Inicio: new Date(data_inicio),
            Data_Final: new Date(data_final)
        };
    } else if (data_final == "" || data_inicio == "") {
        ContasViewModel = {
            descricao: $("#Conta").val(),
            Status_Pagamento: $("#StatusPagamento").val(),
            Categorias_Id: $("#Categoria").val(),

        };
    }

   

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: "/api/Contas/Pesquisa",
        data: JSON.stringify(ContasViewModel),
        contentType: "application/json",
        success: function (resultado) {
            alert(resultado);
           
            document.getElementById("container").innerHTML = "";     
            var container = document.getElementById("container");
            var valor = "<table>"
            valor += "<thead>";
            valor += "<table>";
            valor += "<thead>";
            valor += "<tr>";
            valor += "<th>id</th>";
            valor += "<th>Descrição</th>";
            valor += "<th>Preço</th>";
            valor += "<th>Categoria</th>";
            valor += "<th>Data Vencimento</th>";
            valor += "<th>Status Pagamentos</th>";
            valor += "<th></th>";
            valor += "</tr>";
            valor += "</thead>";
            valor += "<tbody>";
            for (var i = 0; i < resultado.length; i++) {
                valor += "<tr>";
                valor += "<td>" + resultado[i].id + "</td>";
                valor += "<td>" + resultado[i].descricao + "</td>";
                valor += "<td>" + resultado[i].preco + "</td>";
                valor += "<td>" + resultado[i].categorias_Id + "</td>";
                valor += "<td>" + resultado[i].data_Vencimento + "</td>";
                valor += "<td>" + resultado[i].status_Pagamento + "</td>";
                valor += "<td><a onclick='chamaedit(" + resultado[i].id + ")'>Edit</td>";
                valor += "</tr>";
            }
            valor += "</tbody>";
            valor += "</table>";
            container.innerHTML = valor;
        }
    });
            
        }
