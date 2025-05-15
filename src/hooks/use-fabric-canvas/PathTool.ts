import { IFigurePathTool } from '@/shared/types/figure-path-tool.type';
import { CardinalDirection } from '@/shared/enums/cardinal-direction.enum';

export const PathTool: IFigurePathTool = {
  delta: 10,
  x: 20,
  y: 50,
  x1: 30,
  y1: 70,
  x2: 40,
  y2: 50,
  rx: 10,
  ry: 20,
  curveIndex1: 1,
  curveIndex2: 1,

  getPath(vector: string) {
    switch (vector) {
      case CardinalDirection.SOUTH:
        this.x = 20;
        this.y = 50;
        this.x1 = this.x + this.delta;
        this.y1 = this.y + this.delta * 2;
        this.x2 = this.x + this.delta * 2;
        this.y2 = this.y;
        this.rx = 10;
        this.ry = 20;
        this.curveIndex1 = 1;
        break;
      case CardinalDirection.EAST:
        this.x = 20;
        this.y = 50;
        this.x1 = this.x + this.delta * 2;
        this.y1 = this.y + this.delta;
        this.x2 = this.x;
        this.y2 = this.y + this.delta * 2;
        this.rx = 25;
        this.ry = 30;
        this.curveIndex1 = 0;
        this.curveIndex2 = 0;
        break;
      case CardinalDirection.SOUTH_EAST:
        this.x = 20;
        this.y = 50;
        this.x1 = this.x + this.delta * 2; // delta * √2 (диагональ)
        this.y1 = this.y + this.delta * -2;
        this.x2 = this.x + this.delta * 1.828; // 2*delta * √2
        this.y2 = this.y + this.delta * 1.828;
        this.rx = this.delta * 0.8; // Оптимальный радиус для 45°
        this.ry = this.delta * 0.8;
        this.curveIndex1 = 0.8;
        this.curveIndex2 = 0.8;
        return this.createPath2();
        break;
      default:
        return `
          M ${this.x} ${this.y} 
          A ${this.rx} ${this.ry} 0 0 1 ${this.x1} ${this.y1} 
          A ${this.rx} ${this.ry} 0 0 1 ${this.x2} ${this.y2}
        `;
    }
    return this.createPath();
  },

  createPath() {
    return `
          M ${this.x} ${this.y} 
          A ${this.rx} ${this.ry} 0 0 ${this.curveIndex1} ${this.x1} ${this.y1} 
          A ${this.rx} ${this.ry} 0 0 ${this.curveIndex2} ${this.x2} ${this.y2}
        `;
  },

  createPath2() {
    return `
          M ${this.x} ${this.y} 
          A ${this.rx} ${this.ry} 0 0 ${this.curveIndex1} ${this.x2} ${this.y2} 
          A ${this.rx} ${this.ry} 0 0 ${this.curveIndex2} ${this.x1} ${this.y1}
        `;
  },
};
