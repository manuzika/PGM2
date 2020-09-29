$(function() {
    
    function exibir_series() {
        $.ajax({
            url: 'http://localhost:5000/listar_series',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar (resposta) {
            $('#corpoTabelaSeries').empty();
            mostrar_conteudo('TabelaSeries');
            for (var i in resposta) {
                lin = '<tr>' +
                '<td>' + resposta[i].nome + '</td>' + 
                '<td>' + resposta[i].temporada + '</td>' + 
                '<td>' + resposta[i].genero + '</td>' + 
                '<td>' + resposta[i].status + '</td>' + 
                '<td>' + resposta[i].classificacao_indicativa + '</td>' + 
                '</tr>';
                $('#corpoTabelaSeries').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador) {
        $("#TabelaSeries").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }

    $(document).on("click", "#linkListarSeries", function() {
        exibir_series();
    });

    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "#btnIncluirSerie", function validarform() {
        if ((document.getElementById("campoNome").value.length < 3) || (document.getElementById("campoTemporada").value.length < 1) || 
        (document.getElementById("campoGenero").value.length < 5) || (document.getElementById("campoStatus").value.length < 9) ||
        (document.getElementById("campoClassificacaoIndicativa").value.length < 1)) {
            alert('Por favor, preencha todos os campos');
        } 
        else {
            nome = $("#campoNome").val();
            temporada = $("#campoTemporada").val();
            genero = $("#campoGenero").val();
            status = $("#campoStatus").val();
            classificacao_indicativa = $("#campoClassificacaoIndicativa").val();
            var dados = JSON.stringify({ nome: nome, temporada: temporada, genero: genero, status: status, classificacao_indicativa: classificacao_indicativa});
            $.ajax({
                url: 'http://localhost:5000/incluir_serie',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: dados,
                success: serieIncluida,
                error: erroAoIncluir
            });
        }
        function serieIncluida (retorno) {
            if (retorno.resultado == "ok") {
                alert("Série incluída com sucesso!");
                $("#campoNome").val("");
                $("#campoTemporada").val("");
                $("#campoGenero").val("");
                $("#campoStatus").val("");
                $("#campoClassificacaoIndicativa").val("");
            } 
            else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalIncluirSerie').on('hide.bs.modal', function (e) {
        if (! $("#TabelaSeries").hasClass('invisible')) {
            exibir_series();
        }
    });

    mostrar_conteudo("conteudoInicial");
});