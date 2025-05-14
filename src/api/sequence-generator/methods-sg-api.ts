import { sgInstance } from '@/api/sequence-generator/instance-sg-api';
import { SequenceLevelType } from '@/shared/types/sg-api/request-types';
import { GetStepSequenceType, Movement } from '@/shared/types/sg-api/response-types';
import { DistanceFactorType } from '@/shared/types/distance-factor.type';

const movements = [
  {
    id: 'ID109',
    name: 'выкрюк назад внутрь на правой',
    transitionDirection: 'backward',
    rotationDirection: 1,
    rotationDegree: 180,
    startLeg: 'right',
    endLeg: 'right',
    isChangeLeg: false,
    startEdge: 'inner',
    endEdge: 'inner',
    isChangeEdge: false,
    isSpeedIncrease: false,
    isDifficult: true,
    type: 'turn',
    description: '',
    absoluteName: 'counter',
    distance: 2,
    coordinates: {
      vector: 'south_east',
      start: {
        x: 5,
        y: 25,
      },
      end: {
        x: 11,
        y: 19,
      },
    },
  },
  {
    id: 'ID134',
    name: 'чиктао вперёд внутрь с правой',
    transitionDirection: 'forward',
    rotationDirection: 1,
    rotationDegree: 180,
    startLeg: 'right',
    endLeg: 'left',
    isChangeLeg: true,
    startEdge: 'inner',
    endEdge: 'outer',
    isChangeEdge: true,
    isSpeedIncrease: false,
    isDifficult: true,
    type: 'step',
    description: '',
    absoluteName: 'chocktaw',
    distance: 2,
    coordinates: {
      vector: 'south_east',
      start: {
        x: 11,
        y: 19,
      },
      end: {
        x: 17,
        y: 13,
      },
    },
  },
  {
    id: 'ID120',
    name: 'петля назад наружу на левой',
    transitionDirection: 'backward',
    rotationDirection: 2,
    rotationDegree: 360,
    startLeg: 'left',
    endLeg: 'left',
    isChangeLeg: false,
    startEdge: 'outer',
    endEdge: 'outer',
    isChangeEdge: false,
    isSpeedIncrease: false,
    isDifficult: true,
    type: 'turn',
    description: '',
    absoluteName: 'loop',
    distance: 1,
    coordinates: {
      vector: 'south_east',
      start: {
        x: 17,
        y: 13,
      },
      end: {
        x: 20,
        y: 10,
      },
    },
  },
  {
    id: 'ID112',
    name: 'выкрюк назад наружу на левой',
    transitionDirection: 'backward',
    rotationDirection: 1,
    rotationDegree: 180,
    startLeg: 'left',
    endLeg: 'left',
    isChangeLeg: false,
    startEdge: 'outer',
    endEdge: 'outer',
    isChangeEdge: false,
    isSpeedIncrease: false,
    isDifficult: true,
    type: 'turn',
    description: '',
    absoluteName: 'counter',
    distance: 2,
    coordinates: {
      vector: 'north_east',
      start: {
        x: 20,
        y: 10,
      },
      end: {
        x: 26,
        y: 16,
      },
    },
  },
  {
    id: 'ID47',
    name: 'ласточка вперед внутрь на правой',
    transitionDirection: 'forward',
    rotationDirection: 0,
    rotationDegree: 0,
    startLeg: 'left',
    endLeg: 'right',
    isChangeLeg: true,
    startEdge: 'twoEdges',
    endEdge: 'inner',
    isChangeEdge: true,
    isSpeedIncrease: false,
    isDifficult: false,
    type: 'glide',
    description: 'ласточка или ее вариации',
    absoluteName: 'unknown',
    distance: 3,
    coordinates: {
      vector: 'north_west',
      start: {
        x: 26,
        y: 16,
      },
      end: {
        x: 17,
        y: 25,
      },
    },
  },
  {
    id: 'ID134',
    name: 'чиктао вперёд внутрь с правой',
    transitionDirection: 'forward',
    rotationDirection: 1,
    rotationDegree: 180,
    startLeg: 'right',
    endLeg: 'left',
    isChangeLeg: true,
    startEdge: 'inner',
    endEdge: 'outer',
    isChangeEdge: true,
    isSpeedIncrease: false,
    isDifficult: true,
    type: 'step',
    description: '',
    absoluteName: 'chocktaw',
    distance: 2,
    coordinates: {
      vector: 'west',
      start: {
        x: 17,
        y: 25,
      },
      end: {
        x: 11,
        y: 25,
      },
    },
  },
] as unknown as Movement[];

export const sgApi = {
  getStepSequence(
    sequenceLevel: SequenceLevelType = 1,
    distanceFactor: DistanceFactorType = 3
  ) {
    return { data: movements };

    return sgInstance.get<GetStepSequenceType>(`/sg-step`, {
      params: {
        sequenceLevel: sequenceLevel,
        distanceFactor: distanceFactor,
      },
    });
  },
  test() {
    return movements;
  },
};
