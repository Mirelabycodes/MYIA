import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {InferenceClient} from '@huggingface/inference'


dotenv.config()
const hf = new InferenceClient(process.env.HUGGING_FACE_API_KEY)

const app = express()
app.use(cors())
app.use(express.json())

app.post('/front.js', async (req, res) => {
  try {
    const pergunta = req.body.Texto
    const historico = req.body.mensagens
    

   const respostaIA = await hf.chatCompletion({
  model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
  messages: [
    ...historico,
    { role: "user", content: pergunta }
  ],
  provider: "featherless-ai",
  max_tokens: 150,
  temperature: 0.7
});


    const resposta = respostaIA.choices[0].message.content


    res.json({resposta})
  } catch (erro) {
    console.error('Erro no servidor:', erro.message)
    console.error(
      'Resposta do Hugging Face:',
      JSON.stringify(erro.httpResponse?.body, null, 2)
    )
    console.error('Erro no servidor:', erro)
    res.status(500).json({ erro: 'Erro ao falar com a IA.' })
  }
})

app.listen(3333, () => {
  console.log(`servidor rodando em porta http://localhost:${3333}`)
})





