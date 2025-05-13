import { IMovementCoordinates, Movement } from '@/types/sg-api/response-types';
import { useEffect, useRef } from 'react';
import { Line, Canvas, Circle, Path, FabricImage } from 'fabric';

export default function useFabricCanvas(movements: Movement[]) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  function renderCanvas(canvasHtml: HTMLCanvasElement) {
    const { width, height, factor } = getScreenSize();
    initFabricCanvas(canvasHtml, width, height);

    if (movements.length > 0) {
      movements.forEach((movement, index) => {
        const line = renderSingleCurve(
          movement.coordinates,
          movement.distance,
          factor
        );
        fabricCanvasRef.current?.add(line);
        fabricCanvasRef.current?.renderAll();
        if (index === 0) {
          addConnectionMarker(movement.coordinates.start, factor, 'red');
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

  function renderSingleCurve(
    coordinates: IMovementCoordinates,
    distance: number,
    factor: number
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

    const pathStr = `M ${start.x * factor} ${start.y * factor} A ${rx} ${ry} 0 0 1 ${end.x * factor} ${end.y * factor}`;
    // Создаем путь для верхней половины эллипса с острыми концами
    return new Path(pathStr, {
      stroke: 'blue',
      strokeWidth: 3,
      fill: '',
      selectable: false,
    });
  }

  function addConnectionMarker(
    coordinates: { x: number; y: number },
    factor: number,
    color: string = '#FA8072'
  ) {
    const { x, y } = coordinates;

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
    canvasHtml: HTMLCanvasElement,
    width: number,
    height: number
  ) {
    const canvas = new Canvas(canvasHtml, {
      width: width,
      height: height,
      backgroundColor: '#eaeaea',
    });
    fabricCanvasRef.current = canvas;
    FabricImage.fromURL('/_next/static/img/InternationalRink.svg.png').then(
      (img: FabricImage) => {
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.backgroundImage = img;
        canvas.renderAll();
      }
    );
  }

  function getScreenSize() {
    const UNIT_WIDTH = 60;
    const UNIT_HEIGHT = 30;
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
