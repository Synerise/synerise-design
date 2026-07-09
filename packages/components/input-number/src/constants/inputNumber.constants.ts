import { type Delimiter } from '@synerise/ds-core';

export const MAXIMUM_FRACTION_DIGITS = 20;

export const NUMBER_DELIMITER: Delimiter = '.';

export const MAXIMUM_NUMBER_DIGITS = 15;

// Stepper glyphs — formerly the @angle-up-s-icon / @angle-down-s-icon LESS variables in
// inputNumber.mixin.less. Inlined here as the antd base input-number CSS (which provided the
// structural handler-wrap) is removed. HandlerUp/HandlerDown apply these as CSS `mask-image`s
// tinted by a theme token (`background-color`), so the glyph colour follows the palette (and
// dark mode) — the SVG's own `fill` is inert under a mask, hence `currentColor` (colour-agnostic)
// rather than a hardcoded value.
export const ANGLE_UP_SVG =
  'data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbnMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPjAxLTAxLWFuZ2xlLXVwLXM8L3RpdGxlPjxyZWN0IGlkPSJjYW52YXMiIGNsYXNzPSJjbHMtMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ii8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTUuMjUsMTQuMzhhLjc5Ljc5LDAsMCwxLS41My0uMjJMMTIsMTEuNDQsOS4yOCwxNC4xNmEuNzUuNzUsMCwwLDEtMS4wNiwwLC43Ny43NywwLDAsMSwwLTEuMDdsMy4yNS0zLjI1YS43NS43NSwwLDAsMSwxLjA2LDBsMy4yNSwzLjI1YS43Ny43NywwLDAsMSwwLDEuMDdBLjc5Ljc5LDAsMCwxLDE1LjI1LDE0LjM4WiIvPjwvc3ZnPg==';

export const ANGLE_DOWN_SVG =
  'data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbnMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPjAxLTAzLWFuZ2xlLWRvd24tczwvdGl0bGU+PHJlY3QgaWQ9ImNhbnZhcyIgY2xhc3M9ImNscy0xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMiwxNC4zOGEuNzkuNzksMCwwLDEtLjUzLS4yMkw4LjIyLDEwLjkxYS43Ny43NywwLDAsMSwwLTEuMDcuNzUuNzUsMCwwLDEsMS4wNiwwTDEyLDEyLjU2bDIuNzItMi43MmEuNzUuNzUsMCwwLDEsMS4wNiwwLC43Ny43NywwLDAsMSwwLDEuMDdsLTMuMjUsMy4yNUEuNzkuNzksMCwwLDEsMTIsMTQuMzhaIi8+PC9zdmc+';
