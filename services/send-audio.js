/** lib usadad para fazer requisições http */
import axios from 'axios'
/** lib usada para pegar o tempo do audio */
import { getAudioDurationInSeconds } from 'get-audio-duration'
/** lib usada para animar a chamada */
import ora from 'ora'

/** 
 * No Exemplo enviados um audio de uma URL.
 * Caso esteja lento o envio, certifique o tamanho do audio.
 * Audio local envia mais rápido por precisar apenas da conversão para base64
 */
const sendAudio = async (instanceAPI, phone, fileURL) => {
  const spinner = ora('Pegando duração do áudio').start();
  /** pega a duração do áudio */
  const length = await getAudioDurationInSeconds(fileURL)
  spinner.text = `Pegando base64 do áudio`
  /**  A API precisa de um base64, então primeiro vamos pegar o base64 da URL.  */
  const audio = await axios.get(fileURL, { responseType: 'arraybuffer' }).then((response) => {
    /** pega o tipo do audio. Exemplo mp3 etc...  */
    const audioType = response.headers[`content-type`]
    /** pega o audio em base64 */
    const audioData = Buffer.from(response.data, 'binary').toString('base64')
    /** monta o base64 com tipo */
    return `data:${audioType};base64,${audioData}`
  })
  /** com base64 em mãos, precisamos chamar a API da instância informando o telefone e o audio */
  try {
    spinner.text = `Enviando áudio para a API`
    await axios.post(instanceAPI, { phone, audio, length })
    spinner.succeed('Audio enviada a fila de envios, deve chegar em breve.')
  } catch (e) {
    spinner.fail('Problemas ao enviar audio.')
  }
}

export { sendAudio }