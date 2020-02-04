import axios from 'axios'
/** lib usada para pegar o tempo do video */
import { getAudioDurationInSeconds } from 'get-audio-duration'
/** lib usada para animar a chamada */
import ora from 'ora'

const sendVideo = async (instanceAPI, phone, fileURL) => {
  const spinner = ora('Pegando duração do video').start();
  /** pega a duração do video */
  const length = await getAudioDurationInSeconds(fileURL)
  spinner.text = `Pegando base64 do video`
  /**  A API precisa de um base64, então primeiro vamos pegar o base64 da URL.  */
  const video = await axios.get(fileURL, { responseType: 'arraybuffer' }).then((response) => {
    /** pega o tipo do video. Exemplo mp3 etc...  */
    const videoType = response.headers[`content-type`]
    /** pega o video em base64 */
    const videoData = Buffer.from(response.data, 'binary').toString('base64')
    /** monta o base64 com tipo */
    return `data:${videoType};base64,${videoData}`
  })
  /** com base64 em mãos, precisamos chamar a API da instância informando o telefone e o video */
  try {
    spinner.text = `Enviando video para a API`
    await axios.post(instanceAPI, { phone, video, length })
    spinner.succeed('Video enviada a fila de envios, deve chegar em breve.')
  } catch (e) {
    spinner.fail('Problemas ao enviar video.')
  }
}

export { sendVideo }