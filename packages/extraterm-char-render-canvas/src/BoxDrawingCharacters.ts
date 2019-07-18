/**
 * Copyright 2019 Simon Edwards <simon@simonzone.com>
 */
import { Logger, getLogger, log } from "extraterm-logging";


const _log = getLogger("BoxDrawingCharacters");

const FIRST_BOX_CODE_POINT = 0x2500;

export function isBoxCharacter(codePoint: number): boolean {
  return codePoint >= FIRST_BOX_CODE_POINT && codePoint < (FIRST_BOX_CODE_POINT + boxGlyphs.length);
}

const GRID_WIDTH = 5;
const GRID_HEIGHT = 5;

const boxGlyphs = [
  // 0x2500 BOX DRAWINGS LIGHT HORIZONTAL
  "....." +
  "....." +
  "#####" +
  "....." +
  ".....",

  // 0x2501 BOX DRAWINGS HEAVY HORIZONTAL
  "....." +
  "#####" +
  "#####" +
  "#####" +
  ".....",

  // 0x2502 BOX DRAWINGS LIGHT VERTICAL
  "..#.." +
  "..#.." +
  "..#.." +
  "..#.." +
  "..#..",

  // 0x2503 BOX DRAWINGS HEAVY VERTICAL
  ".###." +
  ".###." +
  ".###." +
  ".###." +
  ".###.",

  // 0x2504 BOX DRAWINGS LIGHT TRIPLE DASH HORIZONTAL
  "....." +
  "....." +
  "#.#.#" +
  "....." +
  ".....",

  // 0x2505 BOX DRAWINGS HEAVY TRIPLE DASH HORIZONTAL
  "....." +
  "#.#.#" +
  "#.#.#" +
  "#.#.#" +
  ".....",

  // 0x2506 BOX DRAWINGS LIGHT TRIPLE DASH VERTICAL
  "..#.." +
  "....." +
  "..#.." +
  "....." +
  "..#..",

  // 0x2507 BOX DRAWINGS HEAVY TRIPLE DASH VERTICAL
  ".###." +
  "....." +
  ".###." +
  "....." +
  ".###.",

  // 0x2508 BOX DRAWINGS LIGHT QUADRUPLE DASH HORIZONTAL
  "....." +
  "....." +
  "##.##" +
  "....." +
  ".....",

  // 0x2509 BOX DRAWINGS HEAVY QUADRUPLE DASH HORIZONTAL
  "....." +
  "##.##" +
  "##.##" +
  "##.##" +
  ".....",

  // 0x250A BOX DRAWINGS LIGHT QUADRUPLE DASH VERTICAL
  "..#.." +
  "..#.." +
  "....." +
  "..#.." +
  "..#..",

  // 0x250B BOX DRAWINGS HEAVY QUADRUPLE DASH VERTICAL
  ".###." +
  ".###." +
  "....." +
  ".###." +
  ".###.",

  // 0x250C BOX DRAWINGS LIGHT DOWN AND RIGHT
  "....." +
  "....." +
  "..###" +
  "..#.." +
  "..#..",

  // 0x250D BOX DRAWINGS DOWN LIGHT AND RIGHT HEAVY
  "....." +
  "..###" +
  "..###" +
  "..###" +
  "..#..",

  // 0x250E BOX DRAWINGS DOWN HEAVY AND RIGHT LIGHT
  "....." +
  "....." +
  ".####" +
  ".###." +
  ".###.",

  // 0x250F BOX DRAWINGS HEAVY DOWN AND RIGHT
  "....." +
  ".####" +
  ".####" +
  ".####" +
  ".###.",

  // 0x2510 BOX DRAWINGS LIGHT DOWN AND LEFT
  "....." +
  "....." +
  "###.." +
  "..#.." +
  "..#..",

  // 0x2511 BOX DRAWINGS DOWN LIGHT AND LEFT HEAVY
  "....." +
  "###.." +
  "###.." +
  "###.." +
  "..#..",

  // 0x2512 BOX DRAWINGS DOWN HEAVY AND LEFT LIGHT
  "....." +
  "....." +
  "####." +
  ".###." +
  ".###.",

  // 0x2513 BOX DRAWINGS HEAVY DOWN AND LEFT
  "....." +
  "####." +
  "####." +
  "####." +
  ".###.",

  // 0x2514 BOX DRAWINGS LIGHT UP AND RIGHT
  "..#.." +
  "..#.." +
  "..###" +
  "....." +
  ".....",

  // 0x2515 BOX DRAWINGS UP LIGHT AND RIGHT HEAVY
  "..#.." +
  "..###" +
  "..###" +
  "..###" +
  ".....",

  // 0x2516 BOX DRAWINGS UP HEAVY AND RIGHT LIGHT
  ".###." +
  ".###." +
  ".####" +
  "....." +
  ".....",

  // 0x2517 BOX DRAWINGS HEAVY UP AND RIGHT
  ".###." +
  ".####" +
  ".####" +
  ".####" +
  ".....",

  // 0x2518 BOX DRAWINGS LIGHT UP AND LEFT
  "..#.." +
  "..#.." +
  "###.." +
  "....." +
  ".....",

  // 0x2519 BOX DRAWINGS UP LIGHT AND LEFT HEAVY
  "..#.." +
  "###.." +
  "###.." +
  "###.." +
  ".....",

  // 0x251A BOX DRAWINGS UP HEAVY AND LEFT LIGHT
  ".###." +
  ".###." +
  "####." +
  "....." +
  ".....",

  // 0x251B BOX DRAWINGS HEAVY UP AND LEFT
  ".###." +
  "####." +
  "####." +
  "####." +
  ".....",

  // 0x251C BOX DRAWINGS LIGHT VERTICAL AND RIGHT
  "..#.." +
  "..#.." +
  "..###" +
  "..#.." +
  "..#..",

  // 0x251D BOX DRAWINGS VERTICAL LIGHT AND RIGHT HEAVY
  "..#.." +
  "..###" +
  "..###" +
  "..###" +
  "..#..",

  // 0x251E BOX DRAWINGS UP HEAVY AND RIGHT DOWN LIGHT
  ".###." +
  ".###." +
  ".####" +
  "..#.." +
  "..#..",

  // 0x251F BOX DRAWINGS DOWN HEAVY AND RIGHT UP LIGHT
  "..#.." +
  "..#.." +
  ".####" +
  ".###." +
  ".###.",

  // 0x2520 BOX DRAWINGS VERTICAL HEAVY AND RIGHT LIGHT
  ".###." +
  ".###." +
  ".####" +
  ".###." +
  ".###.",

  // 0x2521 BOX DRAWINGS DOWN LIGHT AND RIGHT UP HEAVY
  "....." +
  "..###" +
  "..###" +
  "..###" +
  "..#..",

  // 0x2522 BOX DRAWINGS UP LIGHT AND RIGHT DOWN HEAVY
  "..#.." +
  "..#.." +
  ".####" +
  ".###." +
  ".###.",

  // 0x2523 BOX DRAWINGS HEAVY VERTICAL AND RIGHT
  ".###." +
  ".####" +
  ".####" +
  ".####" +
  ".###.",

  // 0x2524 BOX DRAWINGS LIGHT VERTICAL AND LEFT
  "..#.." +
  "..#.." +
  "###.." +
  "..#.." +
  "..#..",

  // 0x2525 BOX DRAWINGS VERTICAL LIGHT AND LEFT HEAVY
  "..#.." +
  "###.." +
  "###.." +
  "###.." +
  "..#..",

  // 0x2526 BOX DRAWINGS UP HEAVY AND LEFT DOWN LIGHT
  ".###." +
  "####." +
  "####." +
  "####." +
  "..#..",

  // 0x2527 BOX DRAWINGS DOWN HEAVY AND LEFT UP LIGHT
  "..#.." +
  "####." +
  "####." +
  "####." +
  ".###.",

  // 0x2528 BOX DRAWINGS VERTICAL HEAVY AND LEFT LIGHT
  ".###." +
  ".###." +
  "####." +
  ".###." +
  ".###.",

  // 0x2529 BOX DRAWINGS DOWN LIGHT AND LEFT UP HEAVY
  ".###." +
  "####." +
  "####." +
  "####." +
  "..#..",

  // 0x252A BOX DRAWINGS UP LIGHT AND LEFT DOWN HEAVY
  "..#.." +
  "####." +
  "####." +
  "####." +
  ".###.",

  // 0x252B BOX DRAWINGS HEAVY VERTICAL AND LEFT
  ".###." +
  "####." +
  "####." +
  "####." +
  ".###.",

  // 0x252C BOX DRAWINGS LIGHT DOWN AND HORIZONTAL
  "....." +
  "....." +
  "#####" +
  "..#.." +
  "..#..",

  // 0x252D BOX DRAWINGS LEFT HEAVY AND RIGHT DOWN LIGHT
  "....." +
  "###.." +
  "#####" +
  "###.." +
  "..#..",

  // 0x252E BOX DRAWINGS RIGHT HEAVY AND LEFT DOWN LIGHT
  "....." +
  "..###" +
  "#####" +
  "..###" +
  "..#..",

  // 0x252F BOX DRAWINGS DOWN LIGHT AND HORIZONTAL HEAVY
  "....." +
  "#####" +
  "#####" +
  "#####" +
  "..#..",

  // 0x2530 BOX DRAWINGS DOWN HEAVY AND HORIZONTAL LIGHT
  "....." +
  "....." +
  "#####" +
  ".###." +
  ".###.",

  // 0x2531 BOX DRAWINGS RIGHT LIGHT AND LEFT DOWN HEAVY
  "....." +
  "####." +
  "#####" +
  "####." +
  ".###.",

  // 0x2532 BOX DRAWINGS LEFT LIGHT AND RIGHT DOWN HEAVY
  "....." +
  ".####" +
  "#####" +
  ".####" +
  ".###.",

  // 0x2533 BOX DRAWINGS HEAVY DOWN AND HORIZONTAL
  "....." +
  "#####" +
  "#####" +
  "#####" +
  ".###.",

  // 0x2534 BOX DRAWINGS LIGHT UP AND HORIZONTAL
  "..#.." +
  "..#.." +
  "#####" +
  "....." +
  ".....",

  // 0x2535 BOX DRAWINGS LEFT HEAVY AND RIGHT UP LIGHT
  "..#.." +
  "###.." +
  "#####" +
  "###.." +
  ".....",

  // 0x2536 BOX DRAWINGS RIGHT HEAVY AND LEFT UP LIGHT
  "..#.." +
  "..###" +
  "#####" +
  "..###" +
  ".....",

  // 0x2537 BOX DRAWINGS UP LIGHT AND HORIZONTAL HEAVY
  "..#.." +
  "#####" +
  "#####" +
  "#####" +
  ".....",

  // 0x2538 BOX DRAWINGS UP HEAVY AND HORIZONTAL LIGHT
  ".###." +
  ".###." +
  "#####" +
  "....." +
  ".....",

  // 0x2539 BOX DRAWINGS RIGHT LIGHT AND LEFT UP HEAVY
  ".###." +
  "####." +
  "#####" +
  "####." +
  ".....",

  // 0x253A BOX DRAWINGS LEFT LIGHT AND RIGHT UP HEAVY
  ".###." +
  ".####" +
  "#####" +
  ".####" +
  ".....",

  // 0x253B BOX DRAWINGS HEAVY UP AND HORIZONTAL
  ".###." +
  "#####" +
  "#####" +
  "#####" +
  ".....",

  // 0x253C BOX DRAWINGS LIGHT VERTICAL AND HORIZONTAL
  "..#.." +
  "..#.." +
  "#####" +
  "....." +
  ".....",

  // 0x253D BOX DRAWINGS LEFT HEAVY AND RIGHT VERTICAL LIGHT
  "..#.." +
  "###.." +
  "#####" +
  "###.." +
  ".....",

  // 0x253E BOX DRAWINGS RIGHT HEAVY AND LEFT VERTICAL LIGHT
  "..#.." +
  "..###" +
  "#####" +
  "..###" +
  ".....",

  // 0x253F BOX DRAWINGS VERTICAL LIGHT AND HORIZONTAL HEAVY
  "..#.." +
  "#####" +
  "#####" +
  "#####" +
  ".....",

  // 0x2540 BOX DRAWINGS UP HEAVY AND DOWN HORIZONTAL LIGHT
  ".###." +
  ".###." +
  "#####" +
  "..#.." +
  "..#..",

];

export function drawBoxCharacter(ctx: CanvasRenderingContext2D, codePoint: number, dx: number, dy: number,
    width: number, height: number): void {
_log.debug("drawBoxCharacter");

  // Our box glyphs are on a 5x5 grid where the pixels which touch the edges must be rendered twice
  // the size of the pixels which make up the center. Also we want the glyph pixels to be rendered
  // with consistent integer dimensions, and any extra space is distributed to the edge pixels.

  const hThickness = Math.floor(width / 7);
  const vThickness = Math.floor(height / 7);

  const topRowThickness = Math.ceil((height - 3 * vThickness) / 2);
  const bottomRowThickness = height - 3 * vThickness - topRowThickness;

  const leftColumnThickness = Math.ceil((width - 3 * hThickness) / 2);
  const rightColumnThickness = width - 3 * hThickness - leftColumnThickness;

  const glyphString = boxGlyphs[codePoint - FIRST_BOX_CODE_POINT];
  let pixelOffset = 0;

  const horizontalThicknesses = new Array(GRID_WIDTH);
  horizontalThicknesses[0] = leftColumnThickness;
  for (let i=1; i<GRID_WIDTH-1; i++) {
    horizontalThicknesses[i] = hThickness;
  }
  horizontalThicknesses[GRID_WIDTH-1] = rightColumnThickness;

  const horizontalGridLines = new Array(GRID_WIDTH);
  let accu = 0;
  for (let i=0; i<GRID_WIDTH; i++) {
    horizontalGridLines[i] = accu;
    accu += horizontalThicknesses[i];
  }

  // Top row
  for (let x=0; x<GRID_WIDTH; x++) {
    if (glyphString.charAt(pixelOffset) === "#") {
      ctx.fillRect(dx + horizontalGridLines[x], dy, horizontalThicknesses[x], topRowThickness);
    }
    pixelOffset++;
  }

  // Middle section
  let yOffset = topRowThickness;
  for (let y=1; y<GRID_HEIGHT-1; y++) {
    for (let x=0; x<GRID_WIDTH; x++) {
      if (glyphString.charAt(pixelOffset) === "#") {
        ctx.fillRect(dx + horizontalGridLines[x], dy+yOffset, horizontalThicknesses[x], vThickness);
      }

      pixelOffset++;
    }
    yOffset += vThickness;
  }  

  // Bottom row
  for (let x=0; x<GRID_WIDTH; x++) {
    if (glyphString.charAt(pixelOffset) === "#") {
      ctx.fillRect(dx + horizontalGridLines[x], dy+yOffset, horizontalThicknesses[x], bottomRowThickness);
    }
    pixelOffset++;
  }
}
