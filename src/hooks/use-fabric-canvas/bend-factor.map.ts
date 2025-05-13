import {
  BendFactorType,
  BendFactorKeyType,
} from '@/shared/types/bend-factor-key.type';
import {
  bendFactorKeyFactory,
  bendFactorFactory,
} from '@/shared/lib/bend-factor-factory';

export const BEND_FACTOR_MAP = new Map<BendFactorKeyType, BendFactorType>([
  [
    bendFactorKeyFactory({
      leg: 'left',
      edge: 'inner',
      transitionDirection: 'forward',
    }),
    bendFactorFactory(1),
  ],
  [
    bendFactorKeyFactory({
      leg: 'left',
      edge: 'outer',
      transitionDirection: 'backward',
    }),
    bendFactorFactory(1),
  ],
  [
    bendFactorKeyFactory({
      leg: 'right',
      edge: 'outer',
      transitionDirection: 'forward',
    }),
    bendFactorFactory(1),
  ],
  [
    bendFactorKeyFactory({
      leg: 'right',
      edge: 'inner',
      transitionDirection: 'backward',
    }),
    bendFactorFactory(1),
  ],
  [
    bendFactorKeyFactory({
      leg: 'right',
      edge: 'inner',
      transitionDirection: 'forward',
    }),
    bendFactorFactory(0),
  ],
  [
    bendFactorKeyFactory({
      leg: 'right',
      edge: 'outer',
      transitionDirection: 'backward',
    }),
    bendFactorFactory(0),
  ],
  [
    bendFactorKeyFactory({
      leg: 'left',
      edge: 'outer',
      transitionDirection: 'forward',
    }),
    bendFactorFactory(0),
  ],
  [
    bendFactorKeyFactory({
      leg: 'left',
      edge: 'inner',
      transitionDirection: 'backward',
    }),
    bendFactorFactory(0),
  ],
]);
