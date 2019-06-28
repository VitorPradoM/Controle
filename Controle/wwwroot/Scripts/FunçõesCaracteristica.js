function finalizar() {
    var desc = $("#descricao").val();
   

    var categorias = {
        Descricao: desc
    };

   
    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: "/api/Categorias",
        data: JSON.stringify(categorias),
        contentType: "application/json",
        success: function (resultado) {

        }
    });
}