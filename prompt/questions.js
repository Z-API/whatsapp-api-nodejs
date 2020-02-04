/** lib utilizada para os exemplos ficarem intuitivos */
import inquirer from 'inquirer'

/** importações das services de exemplo de cada tipo de mensagem.  */
import { sendMessage } from '../services/send-message'
import { sendAudio } from '../services/send-audio'
import { sendImage } from '../services/send-image'
import { sendVideo } from '../services/send-video'

export const initQuestions = (INSTANCE_API) => {
  if (!INSTANCE_API) { return console.error(`Informe a API da instância no arquivo index.js e execute novamente.`) }
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'messageType',
        message: 'O que deseja testar?',
        choices: ['Mensagem', 'Imagem', 'Audio', 'Video'],
      },
      {
        type: 'input',
        when: (questions) => questions.messageType !== 'Mensagem',
        name: 'fileURL',
        message: 'Informe a URL do arquivo ou ENTER para utilizar o padrão para exemplos',
        validate: function (input) {
          const done = this.async()
          if (!input || input.startsWith('http')) { done(null, true) }
          done('Por favor informe uma URL válida.')
        }
      },
      {
        type: 'input',
        when: (questions) => questions.messageType === 'Mensagem',
        name: 'message',
        default: 'Esse é um exemplo utilizando o *Z-API* 😜 ',
        message: 'Digite uma mensagem ou ENTER para utilizar o exemplo',
        validate: function (input) {
          const done = this.async()
          if (input && input.replace(/ /g, '').length > 0) { done(null, true) }
          done('Por favor informe uma mensagem.')
        }
      },
      {
        type: 'input',
        name: 'phone',
        message: 'Para quem deseja enviar? (Whatsapp do destinatario)',
        default: '',
        validate: function (input) {
          const done = this.async()
          if (input && input.replace(/ /g, '').length > 0) { done(null, true) }
          done('Por favor digite o destinatario com ddi, ddd e número. Exemplo: 5544999999999')
        }
      }
    ])
    .then((answers) => {
      switch (answers.messageType) {
        case 'Mensagem':
          sendMessage(INSTANCE_API, answers.phone, answers.message)
          break
        case 'Imagem':
          // envia a imagem informada no prompt ou um padrão de exemplo
          sendImage(INSTANCE_API, answers.phone, answers.fileURL || 'https://static.mundoeducacao.bol.uol.com.br/mundoeducacao/conteudo/sai-verde.jpg')
          break
        case 'Audio':
          // envia o audio informado no prompt ou um padrão de exemplo
          sendAudio(INSTANCE_API, answers.phone, answers.fileURL || 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3')
          break
        case 'Video':
          // envia o video informado no prompt ou um padrão de exemplo
          sendVideo(INSTANCE_API, answers.phone, answers.fileURL || 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4')
          break
      }
    })
}