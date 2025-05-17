import { Canvas, Textbox } from 'fabric';
import { IMovementCoordinates } from '@/shared/types/sg-api/response-types';

export function addNumberMarker(
  canvas: Canvas,
  data: {
    text: string;
    coordinates: IMovementCoordinates;
    factor: number;
  }
) {
  const { text, coordinates, factor } = data;

  const offset = calcOffset(coordinates, factor);
  const adjustedCoordinates = {
    x: coordinates.start.x * factor + offset.x,
    y: coordinates.start.y * factor + offset.y,
  };
  const textBox = createTextbox(text, adjustedCoordinates);
  canvas.add(textBox);
}

function calcOffset(coordinates: IMovementCoordinates, factor: number) {
  const { start, end } = coordinates;
  const OFFSET = 15;
  const xVector = (start.x * factor - end.x * factor) * -1;
  const yVector = (start.y * factor - end.y * factor) * -1;
  const length = Math.sqrt(xVector ** 2 + yVector ** 2);
  const xFactor = xVector / length;
  const yFactor = yVector / length;

  return {
    x: OFFSET * xFactor,
    y: OFFSET * yFactor,
  };
}

function createTextbox(text: string, coordinates: { x: number; y: number }) {
  const { x, y } = coordinates;
  return new Textbox(text, {
    left: x,
    top: y,
    fontSize: 16,
    fontFamily: 'Arial',
    fill: '#000000',
    selectable: false,
  });
}
