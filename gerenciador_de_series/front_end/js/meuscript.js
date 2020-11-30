$(function() {

    function exibir_emissoras() {
        $.ajax({
            url: 'http://localhost:5000/listar_emissora',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });    
        function listar (resposta) {
            $('#corpoTabelaEmissoras').empty();
            mostrar_conteudo('ListarEmissoras');
            for (var i in resposta) {
                lin = '<tr id="linha_'+resposta[i].id+'">' + 
                '<td>' + resposta[i].nome + '</td>' + 
                '<td>' + resposta[i].pais + '</td>' + 
                '<td>' + resposta[i].ano + '</td>' + 
                '<td><a href=# id="excluir_' + resposta[i].id + '" ' + 
                  'class="excluir_emissora"><img src="imagens/delete.png" '+
                  'alt="Excluir emissora" title="Excluir emissora"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaEmissoras').append(lin);
            }
        }
    }
    
    $(document).on("click", "#linkListarEmissoras", function() {
        exibir_emissoras();
    });
    
    function exibir_series() {
        $.ajax({
            url: 'http://localhost:5000/listar_serie',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar (resposta) {
            $('#corpoTabelaSeries').empty();
            mostrar_conteudo('ListarSeries');
            for (var i in resposta) {
                lin = '<tr id="linha_'+resposta[i].id+'">' + 
                '<td>' + resposta[i].nome + '</td>' + 
                '<td>' + resposta[i].temporada + '</td>' + 
                '<td>' + resposta[i].genero + '</td>' + 
                '<td>' + resposta[i].status + '</td>' + 
                '<td>' + resposta[i].classificacao_indicativa + '</td>' + 
                '<td>' + resposta[i].emissora.nome + '</td>' + 
                '<td><a href=# id="excluir_' + resposta[i].id + '" ' + 
                  'class="excluir_serie"><img src="imagens/delete.png" '+
                  'alt="Excluir série" title="Excluir série"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaSeries').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador) {
        $("#ListarSeries").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#ListarElencos").addClass('d-none');
        $("#ListarEmissoras").addClass('d-none')
        $("#"+identificador).removeClass('d-none');      
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
        if (! $("#ListarSeries").hasClass('d-none')) {
            exibir_series();
        }
    });

    mostrar_conteudo("conteudoInicial");

    $(document).on("click", ".excluir_serie", function() { 
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_"; 
        var id_serie = componente_clicado.substring(nome_icone.length); 
        $.ajax({ 
            url: 'http://localhost:5000/excluir_serie/'+id_serie, 
            type: 'delete',
            dataType: 'json', 
            success: serieExcluida,
            error: erroAoExcluir 
        });
        function serieExcluida(retorno) {
            if (retorno.resultado == "ok") {
                $("#linha_" + id_serie).fadeOut(1000, function() {
                    alert("Série removida com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoExcluir(retorno) {
            alert("Erro ao excluir dados, verifique o backend: ");
        }
    });

    function exibir_elencos() {
        $.ajax({
            url: 'http://localhost:5000/listar_elenco',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });    
        function listar (resposta) {
            $('#corpoTabelaElencos').empty();
            mostrar_conteudo('ListarElencos');
            for (var i in resposta) {
                lin = '<tr id="linha_'+resposta[i].id+'">' + 
                '<td>' + resposta[i].nome + '</td>' + 
                '<td>' + resposta[i].personagem + '</td>' + 
                '<td>' + resposta[i].categoria + '</td>' + 
                '<td>' + resposta[i].serie.nome + '</td>' + 
                '<td><a href=# id="excluir_' + resposta[i].id + '" ' + 
                  'class="excluir_elenco"><img src="imagens/delete.png" '+
                  'alt="Excluir ator/atriz" title="Excluir ator/atriz"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaElencos').append(lin);
            }
        }
    }
    
    $(document).on("click", "#linkListarElencos", function() {
        exibir_elencos();
    });

});