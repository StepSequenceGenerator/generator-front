import { Line } from 'fabric';

export function createLine(
  coords: [x1: number, y1: number, x2: number, y2: number]
): Line {
  return new Line(coords, {
    stroke: '#000',
    strokeWidth: 2,
    // strokeDashArray: [40, 40],
    selectable: false,
    objectCaching: false,
  });
}
