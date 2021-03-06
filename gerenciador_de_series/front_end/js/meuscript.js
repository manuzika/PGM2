$(function() {

    var urlx = 'http://manoelaroepcke.pythonanywhere.com/';
    function exibir_emissoras() {
        $.ajax({
            url: urlx + '/listar/Emissora',
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

    $(document).on("click", "#btnIncluirEmissora", function validarform() {
        if ((document.getElementById("campoNome").value.length < 1) || (document.getElementById("campoPais").value.length < 2) || 
        (document.getElementById("campoAno").value.length < 4) || (document.getElementById("campoAno").value.length > 5)) {
            alert('Por favor, preencha todos os campos');
        } 
        else {
            nome = $("#campoNome").val();
            pais = $("#campoPais").val();
            ano = $("#campoAno").val();
            var dados = JSON.stringify({ nome: nome, pais: pais, ano: ano});
            $.ajax({
                url: urlx + '/incluir_emissora',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: dados,
                success: emissoraIncluida,
                error: erroAoIncluir
            });
        }
        function emissoraIncluida (retorno) {
            if (retorno.resultado == "ok") {
                alert("Emissora incluída com sucesso!");
                $("#campoNome").val("");
                $("#campoPais").val("");
                $("#campoAno").val("");
            } 
            else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $(document).on("click", ".excluir_emissora", function() { 
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_"; 
        var id_emissora = componente_clicado.substring(nome_icone.length); 
        $.ajax({ 
            url: urlx + '/excluir_emissora/'+id_emissora, 
            type: 'delete',
            dataType: 'json', 
            success: emissoraExcluida,
            error: erroAoExcluir 
        });
        function emissoraExcluida(retorno) {
            if (retorno.resultado == "ok") {
                $("#linha_" + id_emissora).fadeOut(1000, function() {
                    alert("Emissora removida com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoExcluir(retorno) {
            alert("Erro ao excluir dados, verifique o backend: ");
        }
    });
    
    $(document).on("click", "#linkListarEmissoras", function() {
        exibir_emissoras();
    });
    
    function exibir_series() {
        $.ajax({
            url: urlx + '/listar/Serie',
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

    function carregarCombo(combo_id, nome_classe) {
        $.ajax({
            url: urlx + '/listar/'+nome_classe,
            method: 'GET',
            dataType: 'json',
            success: carregar,
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function carregar(dados) {
            $('#'+combo_id).empty();
            for (var i in dados) {
                $('#'+combo_id).append(
                    $('<option></option>').attr("value",
                        dados[i].id).text(dados[i].nome));
            }
        }
    }

    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "#btnIncluirSerie", function validarform() {
        if ((document.getElementById("campoNome2").value.length < 3) || (document.getElementById("campoTemporada").value.length < 1) || 
        (document.getElementById("campoGenero").value.length < 4) || (document.getElementById("campoStatus").value.length < 9) ||
        (document.getElementById("campoClassificacaoIndicativa").value.length < 1)) {
            alert('Por favor, preencha todos os campos');
        } 
        else {
            nome = $("#campoNome2").val();
            temporada = $("#campoTemporada").val();
            genero = $("#campoGenero").val();
            status = $("#campoStatus").val();
            classificacao_indicativa = $("#campoClassificacaoIndicativa").val();
            emissora_id = $("#campoEmissoraId").val();
            var dados = JSON.stringify({ nome: nome, temporada: temporada, genero: genero, status: status, classificacao_indicativa: classificacao_indicativa, emissora_id: emissora_id});
            $.ajax({
                url: urlx + '/incluir_serie',
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
                $("#campoNome2").val("");
                $("#campoTemporada").val("");
                $("#campoGenero").val("");
                $("#campoStatus").val("");
                $("#campoClassificacaoIndicativa").val("");
                $("#campoEmissoraId").val("")
            } 
            else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
    
    $('#modalIncluirSerie').on('show.bs.modal', function (e) {
        carregarCombo("campoEmissoraId", "Emissora");
    });

    mostrar_conteudo("conteudoInicial");

    $(document).on("click", ".excluir_serie", function() { 
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_"; 
        var id_serie = componente_clicado.substring(nome_icone.length); 
        $.ajax({ 
            url: urlx + '/excluir_serie/'+id_serie, 
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
            url: urlx + '/listar/Elenco',
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

    $(document).on("click", "#btnIncluirElenco", function validarform() {
        if ((document.getElementById("campoNome3").value.length < 2) || (document.getElementById("campoPersonagem").value.length < 2) || 
        (document.getElementById("campoCategoria").value.length < 10)) {
            alert('Por favor, preencha todos os campos');
        } 
        else {
            nome = $("#campoNome3").val();
            personagem = $("#campoPersonagem").val();
            categoria = $("#campoCategoria").val();
            serie_id = $("#campoSerieId").val();
            var dados = JSON.stringify({ nome: nome, personagem: personagem, categoria: categoria, serie_id: serie_id});
            $.ajax({
                url: urlx + '/incluir_elenco',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: dados,
                success: emissoraIncluida,
                error: erroAoIncluir
            });
        }
        function emissoraIncluida (retorno) {
            if (retorno.resultado == "ok") {
                alert("Elenco incluído com sucesso!");
                $("#campoNome3").val("");
                $("#campoPersonagem").val("");
                $("#campoCategoria").val("");
                $("#campoSerieId").val("")
            } 
            else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
    
    $('#modalIncluirElenco').on('show.bs.modal', function (e) {
        carregarCombo("campoSerieId", "Serie");
    });

    $(document).on("click", ".excluir_elenco", function() { 
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_"; 
        var id_elenco = componente_clicado.substring(nome_icone.length); 
        $.ajax({ 
            url: urlx + '/excluir_elenco/'+id_elenco, 
            type: 'delete',
            dataType: 'json', 
            success: elencoExcluida,
            error: erroAoExcluir 
        });
        function elencoExcluida(retorno) {
            if (retorno.resultado == "ok") {
                $("#linha_" + id_elenco).fadeOut(1000, function() {
                    alert("Elenco removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoExcluir(retorno) {
            alert("Erro ao excluir dados, verifique o backend: ");
        }
    });

});