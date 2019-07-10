$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/Contas",
        success: function (resultado) {          
            formatabela(resultado);
            caracteristica();
            
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

            formatabela(resultado);
        }
    });
}
function formatabela(resultado) {

    $.ajax({
        type: "GET",
        url: "/api/Categorias",
        success: function (categorias) {


            var container = document.getElementById("container");
            var valor = "<table class='table'>"
            valor += "<thead class='thead-dark'>";
            valor += "<tr>";
            valor += "<th  scope='col'>id</th>";
            valor += "<th  scope='col'>Descrição</th>";
            valor += "<th  scope='col'>Preço</th>";
            valor += "<th  scope='col'>Categoria</th>";
            valor += "<th  scope='col'>Data Vencimento</th>";
            valor += "<th  scope='col'>Status Pagamentos</th>";
            valor += "<th scope='col'></th>";
            valor += "<th scope='col'></th>";
            valor += "</tr>";
            valor += "</thead>";
            valor += "<tbody>";
            for (var i = 0; i < resultado.length; i++) {
                var data = resultado[i].data_Vencimento.split("T")
                data = data[0].split("-")
                data = data[2] + "/" + data[1] + "/" + data[0];
                valor += "<tr>";
                valor += "<td>" + resultado[i].id + "</td>";
                valor += "<td>" + resultado[i].descricao + "</td>";
                valor += "<td>" + resultado[i].preco + "</td>";
                for (var x = 0; x < categorias.length; x++) {
                    if (resultado[i].categorias_Id == categorias[x].id) {
                        valor += "<td>" + categorias[x].descricao + "</td>";

                    }
                }
                valor += "<td>" + data + "</td>";
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
function editar(id) {


    $.ajax({
        type: "GET",
        url: "/api/Contas/" + id,
        data: JSON.stringify(id),
        success: function (resultado) {
            // Formulario Edit Contas
            console.log(resultado);
            data = resultado.data_Vencimento;
            var geral = document.getElementById("geral");
            var html = "<h1 class='titulo' >Editar Contas</h1>"
            html += "<div class='row' style='margin-top:15px'>"
            html += "<div class='col-md-2'>"
            html += "<label>Descrição</label>"
            html += "<input type='hidden' id='id' name='descricao' value='" + resultado.id + "'>"
            html += "<input type='text' id='descricao' name='descricao' value='" + resultado.descricao + "'>"
            html += "</div>"
            html += "<div class='col-md-2'>"
            html += "<label>Preço</label>"
            html += "<input type='text' id='preco' name='preco' value='" + resultado.preco + "'>"
            html += "</div class='col-md-2'>"
            html += "<div class='col-md-2' id='Caracteristica'>"
            html += "</div> "
            html += "<div class='col-md-2' id='Produtos'>"
            html += "</div> "
            html += "<div class='col-md-2'>"
            html += "<label>Data Vencimento</label>"
            html += "<input type='Date' id='data_vencimento' name='data_vencimento' value='" + data.split("T")[0] + "'>"
            html += "</div>"
            html += "<div class='col-md-2'>"
            html += "<label>Status Pagamento</label>"
            html += "<select id='StatusPagamento'  name='StatusPagamento'>"
            html += "<option value='Pago'>Pago</option>"
            html += "<option value='Não Pago' >Não Pago</option>"
            html += "</select>"
            html += "</div>"
            html += "</div>"
            html += "<div style='margin-top:40px'>"
            html += "<a class='inicial-btn' onclick='alterar()'>Finalizar<a/>"
            html += "</div>"
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
                    produtos(resultado.produtos_Id);
                }
            });

        }
    });

    
}
function produtos(id) {
    $.ajax({
        type: "GET",
        url: "/api/Produtos",
        success: function (resultado) {
            console.log(resultado);
            var opcoes = "<label>Produtos</label>";
            opcoes += "<select id='produtos' name='select'>";
            opcoes += "<option value='' selected>Selecione</option>;"
            for (var i = 0; i < resultado.length; i++) {
                if (resultado[i].id == id) {
                    opcoes += "<option selected value=" + resultado[i].produtos.id + ">" + resultado[i].produtos.nome + "</option>"
                } else {
                    opcoes += "<option  value=" + resultado[i].produtos.id + ">" + resultado[i].produtos.nome + "</option>"
                }
            }
            opcoes += "</select>";
            Produtos.innerHTML = opcoes;
        }
        });
}
function caracteristica() {
    $.ajax({
        type: "GET",
        url: "/api/Categorias",
        success: function (resultado) {
            console.log(resultado);
            var opcoes = "<label>Categorias</label>";
            opcoes += "<select id='caracteristica' name='select'>";
            opcoes += "<option value='' selected>Selecione</option>;"
            for (var i = 0; i < resultado.length; i++) {
                opcoes += "<option value=" + resultado[i].id + ">" + resultado[i].descricao + "</option>"
            }
            opcoes += "</select>";
            Caracteristica.innerHTML = opcoes;
        }
    });
}
function alterar() {
    var data_vencimento = $("#data_vencimento").val();
    var descricao = $("#descricao").val();
    var preco = $("#preco").val();
    var id = $("#id").val();
    var status_pagamento = $("#StatusPagamento")[0].value;
    var categoria = $("#caracteristica")[0].value
    var produto = $("#produtos")[0].value;
    preco = preco.replace(",", ".")
    console.log(produto);
    $.ajax({
        type: "PUT",
        accepts: "application/json",
        url: "/api/Contas/" + id,
        data: JSON.stringify({ id: id, Descricao: descricao, Preco: preco, Status_Pagamento: status_pagamento, Categorias_Id: categoria, Data_Vencimento: data_vencimento,Produtos_Id: produto }),
        contentType: "application/json",
        success: function (resultado) {
            window.location.reload();

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