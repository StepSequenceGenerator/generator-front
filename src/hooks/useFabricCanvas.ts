import { IMovementCoordinates, Movement } from '@/types/sg-api/response-types';
import { useEffect, useRef } from 'react';
import { Line, Canvas, Circle } from 'fabric';

export default function useFabricCanvas(movements: Movement[]) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  function renderCanvas(canvas: HTMLCanvasElement) {
    const { width, height, factor } = getScreenSize();
    initFabricCanvas(canvas, width, height);

    if (movements.length > 0) {
      movements.forEach((movement, index) => {
        const line = renderLine(movement.coordinates, factor);
        fabricCanvasRef.current?.add(line);
        if (index === 0) {
          addConnectionMarker(movement.coordinates.start, factor);
        }
        addConnectionMarker(movement.coordinates.end, factor);
      });
    }
  }

  function renderLine(coordinates: IMovementCoordinates, factor: number) {
    const { start, end } = coordinates;
    return new Line(
      [start.x * factor, start.y * factor, end.x * factor, end.y * factor],
      {
        stroke: '#000000',
        strokeWidth: 2,
      }
    );
  }

  function addConnectionMarker(
    coordinates: { x: number; y: number },
    factor: number
  ) {
    const { x, y } = coordinates;
    const color = '#FA8072';
    const RADIUS = 4;
    const marker = new Circle({
      left: x * factor - RADIUS,
      top: y * factor - RADIUS,
      radius: RADIUS,
      fill: color,
      stroke: '#000000',
      strokeWidth: 1,
    });
    fabricCanvasRef.current?.add(marker);
  }

  function initFabricCanvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number
  ) {
    fabricCanvasRef.current = new Canvas(canvas, {
      width: width,
      height: height,
      backgroundColor: '#eaeaea',
    });
  }

  function getScreenSize() {
    const UNIT_WIDTH = 60;
    const UNIT_HEIGHT = 40;
    const FACTOR = 10;
    return {
      width: UNIT_WIDTH * FACTOR,
      height: UNIT_HEIGHT * FACTOR,
      factor: FACTOR,
    };
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    renderCanvas(canvasRef.current);

    return () => {
      fabricCanvasRef.current?.dispose();
    };
  }, [movements]);

  return canvasRef;
}
