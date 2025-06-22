import { Canvas, Path, util } from 'fabric';

export function animatePath(
  canvas: Canvas,
  path: Path,
  duration: number = 1000,
  delay: number = 0
) {
  const pathLength = util
    .getPathSegmentsInfo(path.path || [])
    .reduce((total, segment) => {
      return total + segment.length;
    }, 0);

  path.set({
    strokeDashArray: [pathLength, pathLength],
    strokeDashOffset: pathLength,
  });

  path.animate(
    { strokeDashOffset: 0 },
    {
      duration,
      delay,
      easing: util.ease.easeInOutQuad,
      onChange: () => {
        canvas.requestRenderAll();
      },
      onComplete: () => {
        path.set({
          strokeDashArray: undefined,
          strokeDashOffset: 0,
        });
      },
    }
  );
}
