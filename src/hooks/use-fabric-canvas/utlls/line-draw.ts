import { Canvas, Line, util } from 'fabric';

export async function animateLineDraw(
  canvas: Canvas,
  line: Line,
  duration: number = 500
) {
  const pathLength = Math.sqrt(
    Math.pow(line.x2! - line.x1!, 2) + Math.pow(line.y2! - line.y1!, 2)
  );

  const xStep = Math.abs(line.x2! - line.x1!) / pathLength;

  const newX1 = line.x1!;
  let oldX2 = line.x1!;
  let newX2 = line.x1!;

  while (newX2 < line.x2!) {
    console.log(`newX2 ${newX2}, x2 ${line.x2}`);
    line.set({ x1: newX1, x2: oldX2 });

    await new Promise<number>((resolve) => {
      line.animate(
        { x2: newX2 },
        {
          duration,
          onChange: () => canvas.renderAll(),
          easing: util.ease.easeInOutQuad,
          onComplete: () => {
            line.set({ x1: newX1, x2: newX2 });
            canvas.renderAll();
            resolve(newX2);
          },
        }
      );
    });

    oldX2 = newX2;
    newX2 = oldX2 + xStep;
  }
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
