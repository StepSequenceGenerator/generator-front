import axios, {AxiosInstance} from "axios";
const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";
const SG_URL_API = `${PROTOCOL}://sequence-generator.fsk8.ru/api`

const sgInstance: AxiosInstance = axios.create({
  baseURL: SG_URL_API,
  timeout: 5000
})
export { sgInstance }