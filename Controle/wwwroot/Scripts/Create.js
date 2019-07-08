$(document).ready(function () {
    caracteristica();
  
});

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

function finaliza() {
  var caracteristica =  $("#caracteristica")[0].value;
    var descricao = $("#descricao").val();
    var preco = $("#preco").val();
  var data_vencimento = $("#data_vencimento").val();
    var status_pagamento = $("#StatusPagamento")[0].value;
    preco = preco.replace(",", ".")
    
    var Contas = {
        Categorias_Id: caracteristica,
        Preco: preco,
        Descricao: descricao,
        Status_Pagamento: status_pagamento,
        Data_Vencimento: data_vencimento
    }
       
        $.ajax({
            type: "POST",
            accepts: "application/json",
            url: "/api/Contas",
            data: JSON.stringify(Contas),
            contentType: "application/json",
            success: function (resultado) {
                location.href = "Contas.Html";
            }
        });
    }
  
