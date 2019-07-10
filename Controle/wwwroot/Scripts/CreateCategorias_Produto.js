
function finaliza() {
  
    var descricao = $("#descricao").val();
    
    var CreateCategorias_Produto = {
        Descricao: descricao,
      
    }

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: "/api/Categorias_Produtos",
        data: JSON.stringify(CreateCategorias_Produto),
        contentType: "application/json",
        success: function (resultado) {
            location.href = "Categorias_Produtos.Html";
        }
    });
}

