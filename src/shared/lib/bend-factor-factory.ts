import {
  BendFactorKeyType,
  BendFactorType,
} from '@/shared/types/bend-factor-key.type';

function bendFactorKeyFactory(data: {
  leg: string;
  edge: string;
  transitionDirection: string;
}) {
  if (
    ['left', 'right'].includes(data.leg) &&
    ['inner', 'outer'].includes(data.edge) &&
    ['forward', 'backward'].includes(data.transitionDirection)
  ) {
    return `${data.leg}-${data.edge}-${data.transitionDirection}` as BendFactorKeyType;
  } else {
    // eslint-disable-next-line
    console.error(`from bendFactorKeyFactory: wrong arguments value. ${data}`);
    return 'left-inner-forward' as BendFactorKeyType;
  }
}

function bendFactorFactory(value: number) {
  if ([0, 1].includes(value)) {
    return value as BendFactorType;
  } else {
    // eslint-disable-next-line
    console.error(
      `from bendFactorFactory: value должно быть 0 или 1, получил ${value}`
    );
    return 0 as BendFactorType;
  }
}

export { bendFactorKeyFactory, bendFactorFactory };
