import { CardinalDirection } from '@/shared/enums/cardinal-direction.enum';
import { Movement } from '@/shared/types/sg-api/response-types';

interface IFigurePathTool {
  delta: number;
  x: number;
  y: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  rx: number;
  ry: number;
  curveIndex1: number;
  curveIndex2: number;
  getPath(vector: string): string;
  createPath(): string;
  createPath2(): string;
}
export type { IFigurePathTool };
