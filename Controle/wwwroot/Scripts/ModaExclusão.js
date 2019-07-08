functio
bootbox.confirm({
    message: 'Confirma a exclusão do registro?',
    callback: function (confirmacao) {

        if (confirmacao)
            bootbox.alert('Registro excluído com sucesso.');
        else
            bootbox.alert('Operação cancelada.');

    },
    buttons: {
        cancel: { label: 'Cancelar', className: 'btn-default' },
        confirm: { label: 'EXCLUIR', className: 'btn-danger' }

    }
});
