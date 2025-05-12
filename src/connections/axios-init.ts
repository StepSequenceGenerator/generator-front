// http://sequence-generator-api.fsk8.ru/step-sequence-generator

import axios from 'axios';
const GENERATOR_API_URL = 'http://sequence-generator-api.fsk8.ru';
const axiosSgAPI = axios.create({
  baseURL: GENERATOR_API_URL,
});

export { axiosSgAPI };
