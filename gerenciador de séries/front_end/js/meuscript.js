$(function() {
    
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
        for (var i in resposta) {
            lin = '<tr>' +
              '<td>' + resposta[i].nome + '</td>' + 
              '<td>' + resposta[i].temporada + '</td>' + 
              '<td>' + resposta[i].genero + '</td>' + 
              '<td>' + resposta[i].status + '</td>' + 
              '<td>' + resposta[i].classificacao_indicativa + '</td>' + 
              '</tr>';
            $('#TabelaSeries').append(lin);
        }
    }

});