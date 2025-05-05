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
  "absoluteName": string
}

type GetStepSequenceType =  Movement[];

export {Movement, GetStepSequenceType}