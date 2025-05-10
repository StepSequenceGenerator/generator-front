interface Movement {
  "id": string,
  "name": string,
  "transitionDirection": number,
  "rotationDirection": number,
  "rotationDegree": number,
  "startLeg": number,
  "endLeg": number,
  "isChangeLeg": boolean,
  "startEdge": number,
  "endEdge": number,
  "isChangeEdge": boolean,
  "isSpeedIncrease": boolean,
  "isDifficult": boolean,
  "type": string,
  "description": string,
  "absoluteName": string,
  "distance": number,
  "coordinates": {
    "vector": string,
    "start": {
      "x": number,
      "y": number
    },
    "end": {
      "x": number,
      "y": number
    }
  }
}

type GetStepSequenceType =  Movement[];

export type {Movement, GetStepSequenceType}