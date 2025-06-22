import { IMovementCoordinates } from '@/shared/types/sg-api/response-types';
import { createTextbox } from '@/hooks/use-fabric-canvas/utlls/create-textbox';

export function createNumberMarker(data: {
  text: string;
  coordinates: IMovementCoordinates;
  factor: number;
}) {
  const { text, coordinates, factor } = data;

  const offset = calcOffset(coordinates, factor);
  const adjustedCoordinates = {
    left: coordinates.start.x * factor + offset.x,
    top: coordinates.start.y * factor + offset.y,
  };
  return createTextbox(text, adjustedCoordinates);
}

function calcOffset(coordinates: IMovementCoordinates, factor: number) {
  const { start, end } = coordinates;
  const OFFSET = 15;
  const DIRECTION_FACTOR = -1; // note чтобы по ходу вектора
  const xVector = (start.x * factor - end.x * factor) * DIRECTION_FACTOR;
  const yVector = (start.y * factor - end.y * factor) * DIRECTION_FACTOR;
  const length = Math.sqrt(xVector ** 2 + yVector ** 2);
  const xFactor = xVector / length;
  const yFactor = yVector / length;

  return {
    x: OFFSET * xFactor,
    y: OFFSET * yFactor,
  };
}
