import { Circle } from 'fabric';
export function createConnectionMarker(
  coordinates: { x: number; y: number },
  factor: number,
  color: string = '#FA8072'
) {
  const { x, y } = coordinates;

  const RADIUS = 4;
  return new Circle({
    left: x * factor,
    top: y * factor,
    radius: RADIUS,
    fill: color,
    stroke: '#000000',
    strokeWidth: 1,
    objectCaching: false,
  });
}
