let linhas = document.getElementById("pergunta")
let areaTexto = document.getElementById("resposta")
let botao = document.querySelector('#enviar')


linhas.addEventListener("input", (e) => {
    let texto = e.target
    linhas.style.height = 'auto'
    linhas.style.height = texto.scrollHeight + 'px';
})

