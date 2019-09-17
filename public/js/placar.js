function removerPlacar() {
    $("#removerPlacar").click(function(){
        var linha = $(this).parent().parent()
        linha.fadeOut()
        setInterval(function(){
            linha.remove()
        }, 500)
    })
    
}

function adicionaPlacar(){
    var campoTabela = $('.placar').find('tbody')

    var linha = NovaLinha();

    campoTabela.prepend(linha)
    reiniciarJogo()
    mostra()
    var posicao = $('.placar').offset().top
    $("body").animate({
        scrollTop : posicao
    }, 500)
}

function NovaLinha() {
    
    var tr = $("<tr>")

    var usuario = $("<td>").text($("#displayName").text())
    var palavras = $("<td>").text($('#quantidadePalavras').text())
    var remover = $("<td>").append($('<a class="btn-floating waves-effect light-blue botao-remover" id="removerPlacar"><i class="material-icons">delete</i></a>'))
    var erro = $("<td>").text(contador_erro)
    
    contador_erro = 0;
    tr.append(usuario)
    tr.append(palavras)
    tr.append(erro)
    tr.append(remover)
    

    return tr
}

function mostrarPlacar() {
    var placarmostrar = $('#mostrar-placar')
    placarmostrar.on('click', () => {
        mostra()
    })
}

function mostra() {
    $(".placar").stop().slideDown()
    $('#mostrar-placar').addClass("sumir")
    $("#esconder-placar").removeClass("sumir")
}

function esconderPlacar() {
    var esconderplacar = $("#esconder-placar")
    esconderplacar.on('click', () => {
        $(".placar").stop().slideUp()
        esconderplacar.toggleClass('sumir')
        $('#mostrar-placar').toggleClass("sumir")

    })
}