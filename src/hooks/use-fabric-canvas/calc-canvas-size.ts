export function calcCanvasSize(screenWidth: number) {
  const ORIGINAL_WIDTH = 60;
  const FACTOR_ORIGINAL_WIDTH = 10;
  const width =
    screenWidth > ORIGINAL_WIDTH * FACTOR_ORIGINAL_WIDTH
      ? ORIGINAL_WIDTH * FACTOR_ORIGINAL_WIDTH
      : screenWidth;

  return {
    width: width,
    height: width / 2,
    factor: width / ORIGINAL_WIDTH,
  };
}
