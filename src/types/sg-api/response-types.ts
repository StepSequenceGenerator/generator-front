interface Movement {
  id: string;
  name: string;
  transitionDirection: string;
  rotationDirection: number;
  rotationDegree: number;
  startLeg: string;
  endLeg: string;
  isChangeLeg: boolean;
  startEdge: string;
  endEdge: string;
  isChangeEdge: boolean;
  isSpeedIncrease: boolean;
  isDifficult: boolean;
  type: string;
  description: string;
  absoluteName: string;
  distance: number;
  coordinates: IMovementCoordinates;
}

interface IMovementCoordinates {
  vector: string;
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
}

type GetStepSequenceType = Movement[];

export type { Movement, IMovementCoordinates, GetStepSequenceType };
