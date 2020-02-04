
import { initQuestions } from './prompt/questions'

/**
 * Bem vindo ao exemplos de integração utilizando nodejs.
 * Para que o exemplo seja mais intuitivo utilizamos a lib inquirer para extrair alguns dados
 * Para começar informe a API da sua instância.
 * Crie sua conta em https://z-api.io e conecte sua instância a uma conta whatsapp para pegar a API
 * 
 * A prompt intuitivo apenas executará as funções criadas no pacote "services".
 * Então caso não queira utilizado, você pode importar as services e executa-las direto.
 */

const INSTANCE_API = ``

initQuestions(INSTANCE_API)