import { Canvas, Path } from 'fabric';

export function stepTemplates(canvas: Canvas) {
  const x = 100;
  const y = 100;
  const step = 10;
  const pathLine1 = ``;
  const pathArc1 = `
  M ${x} ${y}  
  L ${x + step} ${y}
  A 5 5 0 0 1 ${x + step * 2 + 10} ${y + step}`;

  const arc1 = new Path(pathArc1, {
    fill: '',
    stroke: 'red',
    strokeWidth: 2,
  });
  // M 100 200 L 150 200 A 50 50 0 0 1 200 250

  const arc2 = new Path('M 100 100 A 50 50 0 0 1 200 100', {
    fill: '',
    stroke: 'blue',
    strokeWidth: 2,
  });

  canvas.add(arc1);
}
