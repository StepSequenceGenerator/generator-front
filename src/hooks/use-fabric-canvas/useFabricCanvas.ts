import { Movement } from '@/shared/types/sg-api/response-types';
import { useEffect, useRef } from 'react';
import { BaseFabricObject, Canvas, Path, FabricImage, Textbox } from 'fabric';
import { bendFactorKeyFactory } from '@/shared/lib/bend-factor-factory';

import { useScreenResizeListener } from '@/hooks/use-screen-resize-listener';
import { calcCanvasSize } from '@/hooks/use-fabric-canvas/calc-canvas-size';
import { createNumberMarker } from '@/hooks/use-fabric-canvas/utlls/elements/create-number-marker';
import { animatePath } from '@/hooks/use-fabric-canvas/utlls/animation/animate-path';
import { animateOpacity } from '@/hooks/use-fabric-canvas/utlls/animation/animate-opacity';
import { getBendFactor } from '@/hooks/use-fabric-canvas/utlls/get-bend-factor';
import { createConnectionMarker } from '@/hooks/use-fabric-canvas/utlls/elements/create-connection-marker';
import { createSingleCurve } from '@/hooks/use-fabric-canvas/utlls/elements/create-single-curve';

export default function useFabricCanvas(movements: Movement[]) {
  const screenWidth = useScreenResizeListener();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  function renderCanvas(canvasHtml: HTMLCanvasElement) {
    const { width, height, factor } = calcCanvasSize(screenWidth);
    initFabricCanvas(canvasHtml, width, height);

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

      const connectionMarker = createConnectionMarker(
        movement.coordinates.end,
        factor
      );
      fabricCanvasRef.current?.add(connectionMarker);

      let numberMarker: Textbox | null = null;
      if (index > 0) {
        numberMarker = createNumberMarker({
          text: String(index),
          coordinates: movement.coordinates,
          factor,
        });
        fabricCanvasRef.current?.add(numberMarker);
      }

      requestAnimationFrame(() => {
        if (fabricCanvasRef.current) {
          animatePath(fabricCanvasRef.current, line, 1000, index * 1000);
          animateOpacity(
            fabricCanvasRef.current,
            connectionMarker,
            100,
            index * 1000 + 500
          );
          if (numberMarker) {
            animateOpacity(
              fabricCanvasRef.current,
              numberMarker,
              100,
              index * 1000 - 500
            );
          }
        }
      });
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
      renderOnAddRemove: true,
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
        canvas.requestRenderAll();
      })
      .catch(() => {
        canvas.requestRenderAll();
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
