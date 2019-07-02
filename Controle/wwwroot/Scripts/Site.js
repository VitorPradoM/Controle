$(document).ready(function () {
       
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
                valor += "<td><a onclick='chamaedit(" + resultado[i].id + ")'>Editar</td>";
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
    data: JSON.stringify(id),
    success: function (resultado) {
     var geral = document.getElementById("geral");
    var html  =  "<h1>Editar</h1>"
        html +=   "<div>"
        html += "<label>Descriçao</label>"
        html += "<input type='text' value=" + resultado.descricao + " id='descr'>"
        html += "<input type='hidden' value="+ resultado.id + " id='id'>"
        html +="</div>"
        html += "<a onclick='alterar()'>Finalizar</a>"
        geral.innerHTML = html;
               }
     });
}


function alterar() {   
    var descricao = $("#descr").val();
    var id = $("#id").val();
    var categorias = {
        Id:id,
        Descricao: descricao
       
    };
    console.log(categorias);
    $.ajax({
        type: "PUT",
        accepts: "application/json",
        url: "/api/Categorias/"+id,
        data: JSON.stringify({ id: id,Descricao : descricao}),
        contentType: "application/json",
        success: function (resultado) {
          
        }
    });
}


