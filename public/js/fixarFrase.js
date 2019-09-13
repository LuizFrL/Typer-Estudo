
$("#fixar-frase").click(function () {
    var fixar = $(this)

    fixar.toggleClass('red accent-2')
    fixar.toggleClass('green accent-4')

    $("#frase-aleatoria")
    .toggleClass('disabled')
    .toggleClass("ativo-para-usar")

})  