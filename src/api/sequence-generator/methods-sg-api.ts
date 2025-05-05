import {sgInstance} from '@/api/sequence-generator/instance-sg-api';
import { SequenceLevelType } from '@/types/sg-api/request-types';
import { GetStepSequenceType } from '@/types/sg-api/response-types';

export const sgApi = {
  getStepSequence(sequenceLevel: SequenceLevelType = 1) {
    return sgInstance.get<GetStepSequenceType>(`/sg-step`);
  },
};

