
// import { HfInference } from '@huggingface/inference' // importando a biblioteca do huggingface 
// const hf = new HfInference() // meu token da plataforma 


// async function execultarIA() { // função da IA 
// try { const response = await hf.chatCompletion({ // para que o try { const response = await?, e a hf.chatCompletion?
// model: 'meta-llama/Llama-3.3-70B-Instruct',
// messages: [
// { role: "user", content: "oque são esses modelos de IA plataforma do Hugging Face, Bert, roBerta, DistilBERT, Xlnet  "}
// ],
// provider:"novita" // provedor de infraestrutura em nuvem que a huggingface  usa, modelos rodarem e responderem as perguntas

// })

// console.log(response.choices[0].message.content) // pega a pergunta 
// } catch (error) {
//   let { TypeError, cause,} = error;
//   console.log("requisição falhou:", TypeError, cause, error ) // caso de erro 
//  }}

//  execultarIA()

// import { HfInference } from '@huggingface/inference' // importando a biblioteca do huggingface 
 //import { json } from 'express'
// const hf = new HfInference("") // meu token da plataforma 



 let textopergunta = document.querySelector('#pergunta')
 let botao = document.querySelector('#enviar')
 let resposta = document.querySelector('#resposta')
 let respostaAtiva =document.querySelector('.resposta-carregando')
let historico = []


async function envio(texto) {

let pergunta = texto.value.trim()

resposta.classList.add('resposta-carregando')

try {
 historico.push({role: "user", content: [{
    type:"text",
    text: pergunta
 }]})
 
   const response = await fetch(`http://localhost:${3333}/front.js`, {
      method:"POST",
      headers:{
         "Content-type":"application/json"
      }, 
      body: JSON.stringify({Texto: pergunta, 
      mensagens: historico 

      })

})


let dados = await response.json()
let respostaTexto = dados.resposta


resposta.textContent = respostaTexto

historico.push({role:"assistant", 
content: respostaTexto})


} catch (error) {
 console.error("requisição falhou:", error);
 resposta.textContent = `a requisição falhou ${error?.message ?? error}`

} resposta.classList.remove('resposta-carregando')

}

botao.addEventListener('click', () => envio(textopergunta))


 


