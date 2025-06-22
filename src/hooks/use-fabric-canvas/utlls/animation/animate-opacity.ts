import { Canvas, Circle, Textbox, util } from 'fabric';

export function animateOpacity(
  canvas: Canvas,
  marker: Circle | Textbox,
  duration: number = 100,
  delay: number = 0
) {
  marker.set({ opacity: 0 });
  marker.animate(
    { opacity: 1 },
    {
      duration,
      delay,
      easing: util.ease.easeInOutQuad,
      onChange: () => canvas.requestRenderAll(),
      onComplete: () => marker.set({ opacity: 1 }),
    }
  );
}
