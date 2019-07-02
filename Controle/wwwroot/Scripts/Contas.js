$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/Contas",
        success: function (resultado) {

            $.ajax({
                type: "GET",
                url: "/api/Categorias",
                success: function (categorias) {


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
                        for (var i = 0; i < categorias.lenght; x++) {
                            if (resultado[i].categorias_Id == categorias.id) {
                                valor += "<td>" + categorias[x].descricao + "</td>";
                            }
                        }
                        valor += "<td>" + resultado[i].data_Vencimento + "</td>";
                        valor += "<td>" + resultado[i].status_Pagamento + "</td>";
                        valor += "<td><a onclick='editar(" + resultado[i].id + ")'>Editar</td>";
                        valor += "<td><a onclick='Remove(" + resultado[i].id + ")'>Excluir</td>";
                        valor += "</tr>";
                    }
                    valor += "</tbody>";
                    valor += "</table>";
                    container.innerHTML = valor;
                }


            });
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
            Categorias_Id: $("#caracteristica").val(),
            Data_Inicio: new Date(data_inicio),
            Data_Final: new Date(data_final)
        };
    } else if (data_final == "" || data_inicio == "") {
        ContasViewModel = {
            descricao: $("#Conta").val(),
            Status_Pagamento: $("#StatusPagamento").val(),
            Categorias_Id: $("#caracteristica").val(),

        };
    }
    console.log(ContasViewModel);
   

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: "/api/Contas/Pesquisa",
        data: JSON.stringify(ContasViewModel),
        contentType: "application/json",
        success: function (resultado) {
            
           
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
function editar(id) {

    $.ajax({
        type: "GET",
        url: "/api/Contas/" + id,
        data: JSON.stringify(id),
        success: function (resultado) {
            // Formulario Edit Contas
            data = resultado.data_Vencimento;
            var geral = document.getElementById("geral");
            var html = "<h1>Editar</h1>"
            html += "<div>"
            html += "<label>Descrição</label>"
            html += "<input type='hidden' id='id' name='descricao' value='" + resultado.id + "'>"
            html += "<input type='text' id='descricao' name='descricao' value='" + resultado.descricao + "'>"
            html += "</div>"
            html += "<div>"
            html += "<label>Preço</label>"
            html += "<input type='text' id='preco' name='preco' value='" + resultado.preco + "'>"
            html += "</div>"
            html += "<div id='Caracteristica'>"
            html += "</div>"
            html += "<div>"
            html += "<label>Data Vencimento</label>"
            html += "<input type='Date' id='data_vencimento' name='data_vencimento' value='" + data.split("T")[0] + "'>"
            html += "</div>"
            html += "<div>"
            html += "<label>Status Pagamento</label>"
            html += "<select id='StatusPagamento'  name='StatusPagamento'>"
            html += "<option value='Pago'>Pago</option>"
            html += "<option value='Não Pago' >Não Pago</option>"
            html += "</select>"
            html += "</div>"
            html += "<a onclick='alterar()'>Finalizar<a/>"
            geral.innerHTML = html;
          
            $("#data_vencimento")[0].value = data.split("T")[0];
            $("#StatusPagamento")[0].value = resultado.status_Pagamento;

            // Opções Categorias
            $.ajax({
                type: "GET",
                url: "/api/Categorias",
                success: function (resultado) {
                    console.log(resultado);
                    var opcoes = "<label>Caracteristica</label>";
                     opcoes += "<select id='caracteristica' name='select'>";
                    for (var i = 0; i < resultado.length; i++) {
                        opcoes += "<option value=" + resultado[i].id + ">" + resultado[i].descricao + "</option>"
                    }
                    opcoes += "</select>";
                    Caracteristica.innerHTML = opcoes;
                   
                    
    
                }
            });
         
        }
    });
}
function alterar() {
    var descricao = $("#descricao").val();
    var preco = $("#preco").val();
    var id = $("#id").val();
    var status_pagamento = $("#StatusPagamento")[0].value;
    var categoria = $("#caracteristica")[0].value

 
    $.ajax({
        type: "PUT",
        accepts: "application/json",
        url: "/api/Contas/" + id,
        data: JSON.stringify({ id: id, Descricao: descricao, Preco: preco, Status_Pagamento: status_pagamento, Categorias_Id: categoria }),
        contentType: "application/json",
        success: function (resultado) {

        }
    });
}
function Remove(id) {
    
    $.ajax({
        type: "DELETE",
        accepts: "application/json",
        url: "/api/Contas/" + id,
        data: JSON.stringify({ "Id": id }),
        contentType: "application/json",
        success: function (resultado) {
            window.location.reload();
        }
    });
}