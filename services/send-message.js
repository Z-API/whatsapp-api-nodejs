import axios from 'axios'
/** lib usada para animar a chamada */
import ora from 'ora'

/**
 * @description Exemplo de envio de mensagem simples
 */
const sendMessage = async (instanceAPI, phone, message) => {
  const spinner = ora('Enviando mensagem para a API').start();
  try {
    await axios.post(instanceAPI, { phone, message })
    spinner.succeed('Mensagem enviada a fila de envios, deve chegar em breve.')
  } catch (e) {
    spinner.fail('Problemas ao enviar mensagem.')
    console.error(e.response?.data || e.message)
  }
}

export { sendMessage }