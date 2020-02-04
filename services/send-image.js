import axios from 'axios'
/** lib usada para animar a chamada */
import ora from 'ora'

const sendImage = async (instanceAPI, phone, fileURL) => {
  const spinner = ora('Pegando base64 da imagem').start();
  /**  A API precisa de um base64, então primeiro vamos pegar o base64 da URL.  */
  const image = await axios.get(fileURL, { responseType: 'arraybuffer' }).then((response) => {
    /** pega o tipo da imagem. Exemplo png, jpg etc...  */
    const imageType = response.headers[`content-type`]
    /** pega a imagem em base64 */
    const imageData = Buffer.from(response.data, 'binary').toString('base64')
    /** monta o base64 com tipo */
    return `data:${imageType};base64,${imageData}`
  })
  /** com base64 em mãos, precisamos chamar a API da instância informando o telefone e o imagem */
  try {
    spinner.text = `Enviando imagem para a API`
    await axios.post(instanceAPI, { phone, image })
    spinner.succeed('Imagem enviada a fila de envios, deve chegar em breve.')
  } catch (e) {
    spinner.fail('Problemas ao enviar imagem.')
  }
}

export { sendImage }