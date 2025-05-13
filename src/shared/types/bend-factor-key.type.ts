type BendFactorKeyType = string & { __brand: 'bendFactorKey' };
type BendFactorType = 0 | (1 & { __brand: 'bendFactor' });

type LegBendFactorKeyType = 'left' | 'right';
type EdgeBendFactorKeyType = 'inner' | 'outer';
type TransitionDirectionFactorKeyType = 'forward' | 'backward';

export type {
  BendFactorType,
  BendFactorKeyType,
  LegBendFactorKeyType,
  EdgeBendFactorKeyType,
  TransitionDirectionFactorKeyType,
};
