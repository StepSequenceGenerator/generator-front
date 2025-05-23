import { Canvas, Path, util } from 'fabric';

export function animateLine(
  canvas: Canvas,
  line: Path,
  duration: number = 1000,
  delay: number = 0
) {
  const pathLength = util
    .getPathSegmentsInfo(line.path || [])
    .reduce((total, segment) => {
      return total + segment.length;
    }, 0);

  line.set({
    strokeDashArray: [pathLength, pathLength],
    strokeDashOffset: pathLength,
  });

  line.animate({
    strokeDashOffset: {
      // @ts-expect-error: animate supports object notation in Fabric 6.x
      to: 0,
      duration,
      delay,
      easing: util.ease.easeInOutQuad,
      onChange: () => canvas.requestRenderAll(),
      onComplete: () => {
        line.set({
          strokeDashArray: undefined,
          strokeDashOffset: 0,
        });
        canvas.requestRenderAll();
      },
    },
  });
}

// export function animateLine(
//   canvas: Canvas,
//   line: Path,
//   duration: number = 300,
//   delay: number = 0
// ) {
//   const pathLength = util
//     .getPathSegmentsInfo(line.path ?? [])
//     .reduce((total, segment) => total + segment.length, 0);
//
//   line.set({
//     strokeDashArray: [pathLength, pathLength],
//     strokeDashOffset: pathLength,
//   });
//
//   line.animate({
//     strokeDashOffset: {
//       // @ts-expect-error — animate с объектной формой
//       to: 0,
//       duration,
//       delay,
//       easing: util.ease.easeInOutQuad,
//       onChange: () => canvas.requestRenderAll(),
//       onComplete: () => {
//         line.set({
//           strokeDashArray: undefined,
//           strokeDashOffset: 0,
//         });
//         canvas.requestRenderAll();
//       },
//     },
//   });
// }
