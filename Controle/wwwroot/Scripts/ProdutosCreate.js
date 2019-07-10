$(document).ready(function () {
    fornecedores();
    Categorias();

});

function fornecedores() {
    $.ajax({
        type: "GET",
        url: "/api/Fornecedores",
        success: function (resultado) {
            console.log(resultado);
            var opcoes = "<label>Fornecedores</label>";
            opcoes += "<select id='fornecedores' name='select'>";
            opcoes += "<option value='' selected>Selecione</option>;"
            for (var i = 0; i < resultado.length; i++) {
                opcoes += "<option value=" + resultado[i].id + ">" + resultado[i].nome + "</option>"
            }
            opcoes += "</select>";
            Fornecedores.innerHTML = opcoes;
        }
    });
}

function Categorias() {
    $.ajax({
        type: "GET",
        url: "/api/Categorias_Produtos",
        success: function (resultado) {
            console.log(resultado);
            var opcoes = "<label>Categorias</label>";
            opcoes += "<select id='categorias' name='select'>";
            opcoes += "<option value='' selected>Selecione</option>;"
            for (var i = 0; i < resultado.length; i++) {
                opcoes += "<option value=" + resultado[i].id + ">" + resultado[i].descricao + "</option>"
            }
            opcoes += "</select>";
            Categoria.innerHTML = opcoes;
        }
    });
}
function Cadastrar() {
    var nome = $("#Nome").val();
    var quantidade = $("#quantidade").val();
    var valor = $("#valor").val();
    var id_fornecedor = $("#fornecedores")[0].value;
    var categoria_produto_id = $("#categorias")[0].value;

    var produtos = {
        Nome: nome,
        Quantidade: quantidade,
        Valor: valor,
        Fornecedor_Id: id_fornecedor,
        Categoria_Produto_Id: categoria_produto_id
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: "/api/Produtos",
        data: JSON.stringify(produtos),
        contentType: "application/json",
        success: function (resultado) {

        }
    });

}