$(document).ready(function () {
    alert('passei aqui')
    
    $.ajax({
        type: "GET",
        url: "/api/Categorias",
        success: function (resultado) {

            var container = document.getElementById("container");
            var valor = "<table>"
                valor += "<thead>";
                valor += "<table>";
                valor += "<thead>";
                valor += "<tr>";
                valor += "<th>id</th>";
            valor += "<th>Descrição</th>";
            valor += "<th></th>";
                valor += "</tr>";
                valor += "</thead>";
                valor += "<tbody>";
                valor += "<tr>";
            for (var i = 0; i < resultado.length; i++) {
                "<td>" + resultado[i].id + "</td>";
                "<td>" + resultado[i].descricao + "</td>";
            }        
               valor +=   "</tbody>";
            valor += "</table>";
            container.innerHTML = valor;
        }
     });
});

