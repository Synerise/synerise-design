// The shade steps every custom-colour family exposes.
export type CustomColorShade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

// A custom-colour token "name-hue" combo, e.g. `'blue-600'` — one of the 12 categorical families
// (matches `customColorNames` from @synerise/ds-tokens) paired with a shade step. Every combo maps
// 1:1 to a reversible `--ds-color-background-custom-<name>-<shade>` token via `resolveCustomColor`.
// Components that take a categorical colour prop use this (slider `tracksColorMap`, card-tabs `color`).
export type CustomColorToken =
  `${'blue' | 'cyan' | 'fern' | 'green' | 'grey' | 'mars' | 'orange' | 'pink' | 'purple' | 'red' | 'violet' | 'yellow'}-${CustomColorShade}`;
