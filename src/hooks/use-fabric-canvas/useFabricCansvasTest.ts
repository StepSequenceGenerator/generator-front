import { useEffect, useRef } from 'react';
import { BaseFabricObject, Canvas } from 'fabric';
import { useScreenResizeListener } from '@/hooks/use-screen-resize-listener';
import { calcCanvasSize } from '@/hooks/use-fabric-canvas/calc-canvas-size';
import { createLine } from '@/hooks/use-fabric-canvas/utlls/create-line';
import { animateLineDraw } from '@/hooks/use-fabric-canvas/utlls/line-draw';

export function useFabricCanvasTest() {
  const screenWidth = useScreenResizeListener();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  function setupFabricCanvas(canvasHtml: HTMLCanvasElement) {
    const { width, height } = calcCanvasSize(screenWidth);
    initFabricCanvas(canvasHtml, width, height);
    renderFabricCanvas();
  }

  function renderFabricCanvas() {
    if (!fabricCanvasRef.current) return;
    const line = createLine([300, 150, 400, 150]);
    fabricCanvasRef.current.add(line);
    animateLineDraw(fabricCanvasRef.current, line);
    fabricCanvasRef.current.renderAll(); // Явный рендер
  }

  function initFabricCanvas(
    canvasHtml: HTMLCanvasElement,
    width: number,
    height: number
  ) {
    // Проверяем, не инициализирован ли canvas
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
    }

    const canvas = new Canvas(canvasHtml, {
      width,
      height,
      backgroundColor: '#eaeaea',
      renderOnAddRemove: false, // Контроль рендера вручную
    });

    BaseFabricObject.ownDefaults.originX = 'center';
    BaseFabricObject.ownDefaults.originY = 'center';
    fabricCanvasRef.current = canvas;
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    setupFabricCanvas(canvasRef.current);

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [screenWidth]); // Реакция на изменение размера экрана

  function handleRerender() {
    if (!canvasRef.current || !fabricCanvasRef.current) return;
    setupFabricCanvas(canvasRef.current);
  }

  useEffect(() => {
    document.addEventListener('rerender', handleRerender);

    return () => {
      document.removeEventListener('rerender', handleRerender);
    };
  }, []);

  return canvasRef;
}
