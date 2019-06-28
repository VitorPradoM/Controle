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