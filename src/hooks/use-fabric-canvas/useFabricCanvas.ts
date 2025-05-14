import {
  IMovementCoordinates,
  Movement,
} from '@/shared/types/sg-api/response-types';
import { useEffect, useRef } from 'react';
import { Line, Canvas, Circle, Path, FabricImage } from 'fabric';
import { bendFactorKeyFactory } from '@/shared/lib/bend-factor-factory';
import {
  BendFactorKeyType,
  BendFactorType,
} from '@/shared/types/bend-factor-key.type';
import { BEND_FACTOR_MAP } from '@/hooks/use-fabric-canvas/bend-factor.map';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/shared/consts/canvas.const';
import { IFigurePathTool } from '@/shared/types/figure-path-tool.type';

export default function useFabricCanvas(movements: Movement[]) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  function renderCanvas(canvasHtml: HTMLCanvasElement) {
    const { width, height, factor } = getScreenSize();
    initFabricCanvas(canvasHtml, width, height);

    if (movements.length > 0) {
      movements.forEach((movement, index) => {
        const bendFactorKey = bendFactorKeyFactory({
          leg: movement.startLeg,
          edge: movement.startEdge,
          transitionDirection: movement.transitionDirection,
        });

        const bendFactor = getBendFactor(bendFactorKey);
        const line = renderSingleCurve(
          movement.coordinates,
          movement.distance,
          factor,
          bendFactor
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

  function getBendFactor(key: BendFactorKeyType) {
    return BEND_FACTOR_MAP.get(key) || (0 as BendFactorType);
  }

  function renderSingleCurve(
    coordinates: IMovementCoordinates,
    distance: number,
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

    FabricImage.fromURL('./img/InternationalRink.svg.png').then(
      (img: FabricImage) => {
        img.scaleToWidth(fabricCanvasRef.current?.width || width);
        img.scaleToHeight(fabricCanvasRef.current?.height || height);
        if (fabricCanvasRef.current) {
          fabricCanvasRef.current.backgroundImage = img;
        }
        canvas.renderAll();
      }
    );

    drawCheckmark(canvas, 300, 200, 50);
  }

  function drawCheckmark(
    canvas: Canvas,
    x: number,
    y: number,
    size: number = 10,
    color: string = 'green'
  ) {
    // const path = `M ${x} ${y} L ${x + 10} ${y + 10} L ${x + 10} ${y + 10}`;
    // const path = 'M 20 50 L 30 70 L 40 50';
    const pathTool: IFigurePathTool = {
      delta: 10,
      x: 20,
      y: 50,
      get x1() {
        return this.x + this.delta;
      },
      get y1() {
        return this.y + this.delta;
      },
    };
    const path = `M ${pathTool.x} ${pathTool.y} A 10 20 0 0 1 30 70 A 10 20 0 0 1 40 50`;
    const scale = size / 100;

    const checkmark = new Path(path, {
      left: x,
      top: y,
      stroke: color,
      strokeWidth: 3,
      fill: '',
      // scaleX: scale,
      // scaleY: scale,
      selectable: false,
    });

    canvas.add(checkmark);
    canvas.renderAll();
  }

  function getScreenSize() {
    const UNIT_WIDTH = CANVAS_WIDTH;
    const UNIT_HEIGHT = CANVAS_HEIGHT;
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
