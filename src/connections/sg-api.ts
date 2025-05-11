import { axiosSgAPI } from '@/connections/axios-init';
import { apiStepSequenceType } from '@/types/step-sequence-type';

export function getStepSequence() {
  return axiosSgAPI.get<apiStepSequenceType[]>('/step-sequence-generator');
}
