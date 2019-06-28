$(document).ready(function () {
    alert('aqui');
    $.ajax({
        type: "GET",
        url: "/api/Categorias",
        success: function (resultado) {
            console.log(resultado);
            var opcoes = "<select name='select'>";
            for (var i = 0; i < resultado.length; i++) {
                opcoes += "<option value=" + resultado[i].Id + ">" + resultado[i].descricao+"</option>"
            }
            opcoes += "</select>";
            Caracteristica.innerHTML = opcoes;
        }
    });
});