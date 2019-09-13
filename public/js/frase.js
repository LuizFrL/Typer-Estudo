var contador_erro = 0;
function verificarFrase() {
    textoDigitado.on("input", function () {
        var fraseInicial = $("#fraseEscrita").text()
        var textoDigit = textoDigitado.val()
        if (fraseInicial == textoDigit) {
            Command: toastr["success"]("", "Parabens!")
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "2000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }

            tempoDigitacao = $("#Tempo").text('1')
        }
        else if (fraseInicial.substr(0, textoDigit.length) == textoDigit) {
            textoDigitado.addClass("borda-verde")
            textoDigitado.removeClass("borda-vermelha")

        } else {
            contador_erro++
            textoDigitado.addClass("borda-vermelha")
            textoDigitado.removeClass("borda-verde")
        }
    })
}

function palavraQtdFrase() {
    textoDigitado.on("input", event => {

        var palavras = textoDigitado.val().split(/\s/)
        $("#quantidadePalavras").text(palavras.length)
    })
}

function palavraFrase() {
    var palavraFrase = $("#fraseEscrita").text().split(" ").length
    $("#quantidadePalavrasFrase").text(palavraFrase)
}

function textoDigiLen() {
    textoDigitado.on("input", event => {
        $("#quantidadeCaracters").text(textoDigitado.val().length)
    })
}




