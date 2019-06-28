$(document).ready(function () {
    alert('passei aqui')
    
    $.ajax({
        type: "GET",
        url: "/api/Categorias",
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
            valor += "<th></th>";
                valor += "</tr>";
                valor += "</thead>";
                valor += "<tbody>";
            for (var i = 0; i < resultado.length; i++) {
                valor += "<tr>";
                valor +="<td>" + resultado[i].id + "</td>";
                valor += "<td>" + resultado[i].descricao + "</td>";
                valor += "<td><a onclick='chamaedit(" + resultado[i].id+")'>Edit</td>";
                valor += "</tr>";
            }        
               valor +=   "</tbody>";
            valor += "</table>";
            container.innerHTML = valor;
        }
     });
});

function chamaedit(id) {
  
$.ajax({
    type: "GET",
    url: "/api/Categorias/"+id,
    success: function (resultado) {

       
               }
     });
}


function alterar() {
    var descricao = $("#descr").val();
    var id = $("#id").val();
    var categorias = {
        Id: id, 
        Descricao: descricao
       
    };
 
    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: "/api/Categorias",
        data: JSON.stringify(categorias),
        contentType: "application/json",
        success: function (resultado) {
            alert("deu certo");
        }
    });
}