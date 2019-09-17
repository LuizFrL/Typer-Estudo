$("#frase-aleatoria").click(fraseAleatoria)
$("#escolher-frase").click(selecionarFrase)

var data_firebase = [];


firebase.database().ref("frases").on('child_added', function (snapshot) {
    data_firebase.push(snapshot.val())
})


function fraseAleatoria() {

    if ($(".ativo-para-usar").length != 0) {
        $(".progress").attr('id', '')
        setTimeout(function () {
            trocaFrase(data_firebase)
            $(".progress").attr('id', 'spinner')
        }, 500)
    }

}

function trocaFrase(data) {
    var frase = $("#fraseEscrita")

    var idFrase = Math.floor(Math.random() * data.length)

    frase.text(data_firebase[idFrase].texto)

    $("#pensador-frase").text(data[idFrase].pensador)
    $("#id-frase").text(idFrase)

    atualizatempoInicial(data[idFrase].tempo + Math.floor(Math.random() * 10))
    palavraFrase()
    

}

function selecionarFrase() {
    var idFrase = $("#idFrase").val()

    if (idFrase > data_firebase.length) {
        Command: toastr["warning"]("", "ID não localizado.")

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        return
    }

    $("#fraseEscrita").text(data_firebase[idFrase].texto)
    $("#pensador-frase").text(data_firebase[idFrase].pensador)
    $("#id-frase").text(idFrase)

    atualizatempoInicial(data_firebase[idFrase].tempo + Math.floor(Math.random() * 10))
    palavraFrase()
}

