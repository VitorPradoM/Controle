
function Cadastra() {
   
    var nome = $("#Nome").val();
    var cnpj = $("#Cnpj").val();
    var cpf = $("#Cpf").val();
    var logradouro = $("#Logradouro").val();
    var bairro = $("#Bairro").val();
    var numero = $("#Numero").val();
    var cidade = $("#Cidade").val();
    var estado = $("#Estado").val();
    var pais = $("#Pais").val();
    var cep = $("#Cep").val();
    if (bairro != "" && numero != "" && cidade != "" && estado != "" && pais != "" && cep != "") {
        var Enderecos = {
            Logradouro: logradouro,
            Bairro: bairro,
            Numero: numero,
            Cidade: cidade,
            Estado: estado,
            Pais: pais,
            Cep: cep
        };

        Fornecedores = {
            Nome: nome,
            Cnpj: cnpj,
            Cpf: cpf
        };
        Endereco_Fornecedor = {
            enderecos: Enderecos,
            fornecedores: Fornecedores
        }


        $.ajax({
            type: "POST",
            accepts: "application/json",
            url: "/api/Fornecedores",
            data: JSON.stringify(Endereco_Fornecedor),
            contentType: "application/json",
            success: function (resultado) {
                location.href = "Fornecedores.html";
            }
        });
    } else{
        alert('Campo Obrigatorios deve ser preenchidos')
    }
}

function fisico() {
    $("#cpfdiv")[0].hidden = false;
    $("#cnpjdiv")[0].hidden = true;
}

function juridico() {
    $("#cnpjdiv")[0].hidden = false;
    $("#cpfdiv")[0].hidden = true;
}