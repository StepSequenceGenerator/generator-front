import { Path } from 'fabric';
import { IMovementCoordinates } from '@/shared/types/sg-api/response-types';
import { BendFactorType } from '@/shared/types/bend-factor-key.type';

export function createSingleCurve(
  coordinates: IMovementCoordinates,
  factor: number,
  bendFactor: BendFactorType
) {
  const { start, end } = coordinates;
  // Параметры дуги
  let rx = 10;
  let ry = 10;
  const deltaX = Math.abs(end.x - start.x);
  const deltaY = Math.abs(end.y - start.y);
  if (deltaY === 0) {
    rx *= 2;
  } else if (deltaX === 0) {
    ry *= 2;
  }

  const pathStr = `M ${start.x * factor} ${start.y * factor} A ${rx} ${ry} 0 0 ${bendFactor} ${end.x * factor} ${end.y * factor}`;

  return new Path(pathStr, {
    stroke: 'blue',
    strokeWidth: 3,
    fill: '',
    selectable: false,
    objectCaching: false,
  });
}
