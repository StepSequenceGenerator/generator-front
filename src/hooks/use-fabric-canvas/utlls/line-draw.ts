import { Canvas, Line, Path, util } from 'fabric';

export async function animateLineDraw(
  canvas: Canvas,
  line: Line,
  duration: number = 500
) {
  const lineLength = Math.hypot(line.x2! - line.x1!, line.y2! - line.y1!);

  line.set({
    strokeDashArray: [lineLength, lineLength],
    strokeDashOffset: lineLength,
  });

  line.animate(
    { strokeDashOffset: 0 },
    {
      duration,
      easing: util.ease.easeInOutQuad,
      onChange: () => {
        canvas.requestRenderAll();
      },
      onComplete: () => {
        line.set({
          strokeDashArray: undefined,
          strokeDashOffset: 0,
        });
      },
    }
  );
}
// Устанавливаем начальные параметры анимации
// line.set({
//   x1: line.x1!,
//   x2: line.x1!,
// });
//
// // Запускаем анимацию
// line.animate(
//   { x1: line.x1, x2: line.x2! },
//   {
//     duration,
//     onChange: () => {
//       canvas.renderAll();
//     },
//     easing: util.ease.easeInOutQuad,
//     onComplete: () => {
//       line.set({ x1: line.x1, x2: line.x2 });
//       canvas.renderAll();
//     },
//   }
// );
