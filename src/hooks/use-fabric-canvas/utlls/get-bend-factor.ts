import {
  BendFactorKeyType,
  BendFactorType,
} from '@/shared/types/bend-factor-key.type';
import { BEND_FACTOR_MAP } from '@/hooks/use-fabric-canvas/bend-factor.map';

export function getBendFactor(key: BendFactorKeyType) {
  return BEND_FACTOR_MAP.get(key) || (0 as BendFactorType);
}
