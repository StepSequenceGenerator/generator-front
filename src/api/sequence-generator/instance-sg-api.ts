import axios, {AxiosInstance} from "axios";
const SG_URL_API = 'http://sequence-generator.fsk8.ru/api'

const sgInstance: AxiosInstance = axios.create({
  baseURL: SG_URL_API,
  timeout: 5000
})
export { sgInstance }