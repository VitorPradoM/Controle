function finalizar() {
   

    var categorias = {
        descricao: $("#descricao").val()
    };

   
    $.ajax({
        type: "POST",
        url: "/api/Categorias",
        data: categorias,
        contentType: "application/json",
        success: function (resultado) {

        }
    });
}