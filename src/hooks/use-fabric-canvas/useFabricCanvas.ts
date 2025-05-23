import {
  IMovementCoordinates,
  Movement,
} from '@/shared/types/sg-api/response-types';
import { useEffect, useRef } from 'react';
import { BaseFabricObject, Canvas, Circle, Path, FabricImage } from 'fabric';
import { bendFactorKeyFactory } from '@/shared/lib/bend-factor-factory';
import {
  BendFactorKeyType,
  BendFactorType,
} from '@/shared/types/bend-factor-key.type';
import { BEND_FACTOR_MAP } from '@/hooks/use-fabric-canvas/bend-factor.map';
import { useScreenResizeListener } from '@/hooks/use-screen-resize-listener';
import { calcCanvasSize } from '@/hooks/use-fabric-canvas/calc-canvas-size';
import { createNumberMarker } from '@/hooks/use-fabric-canvas/utlls/number-marker';

export default function useFabricCanvas(movements: Movement[]) {
  const screenWidth = useScreenResizeListener();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  function renderCanvas(canvasHtml: HTMLCanvasElement) {
    const { width, height, factor } = calcCanvasSize(screenWidth);
    initFabricCanvas(canvasHtml, width, height);

    if (movements.length > 0) {
      movements.forEach((movement, index) => {
        const bendFactorKey = bendFactorKeyFactory({
          leg: movement.startLeg,
          edge: movement.startEdge,
          transitionDirection: movement.transitionDirection,
        });

        const bendFactor = getBendFactor(bendFactorKey);
        const line = createSingleCurve(movement.coordinates, factor, bendFactor);
        fabricCanvasRef.current?.add(line);

        if (index === 0) {
          const startMarker = createConnectionMarker(
            movement.coordinates.start,
            factor,
            'red'
          );
          fabricCanvasRef.current?.add(startMarker);
        }

        if (index > 0 && fabricCanvasRef.current !== null) {
          const numberMarker = createNumberMarker(fabricCanvasRef.current, {
            text: String(index),
            coordinates: movement.coordinates,
            factor,
          });
          fabricCanvasRef.current?.add(numberMarker);
        }
        const marker = createConnectionMarker(movement.coordinates.end, factor);
        fabricCanvasRef.current?.add(marker);
      });
      fabricCanvasRef.current?.renderAll();
    }
  }

  function getBendFactor(key: BendFactorKeyType) {
    return BEND_FACTOR_MAP.get(key) || (0 as BendFactorType);
  }

  function createSingleCurve(
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
    });
  }

  function createConnectionMarker(
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
    });
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
    BaseFabricObject.ownDefaults.originX = 'center';
    BaseFabricObject.ownDefaults.originY = 'center';

    FabricImage.fromURL('/_next/static/img/InternationalRink.svg.png') //
      .then((img: FabricImage) => {
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);

        img.set({
          left: canvas.width! / 2,
          top: canvas.height! / 2,
        });

        canvas.backgroundImage = img;
        canvas.renderAll();
      })
      .catch(() => {
        canvas.renderAll();
      });
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    renderCanvas(canvasRef.current);

    return () => {
      fabricCanvasRef.current?.dispose();
    };
  }, [movements, screenWidth]);

  return canvasRef;
}
