import type { Decorator } from '@storybook/react-vite';
import { composeStories } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import React from 'react';
import styled from 'styled-components';

type CsfModule = Parameters<typeof composeStories>[0];

type Annotations = {
  parameters?: Record<string, unknown>;
  play?: unknown;
  loaders?: unknown;
  beforeEach?: unknown;
  globals?: unknown;
};

type MatrixStoryOptions = {
  /** Stories left out of the matrix, each with the reason. They keep their own snapshot. */
  exclude?: Record<string, string>;
  /** Meta decorators a cell must not get, such as a wrapper that sizes the story to the viewport. */
  withoutDecorators?: Decorator[];
};

type StoryMatrixProps = {
  stories: Record<string, ComponentType>;
  columns?: number;
};

const ADDON_PARAMETERS = ['pseudo', 'backgrounds', 'viewport'];

const configACellDrops = (annotations: Annotations) => [
  ...ADDON_PARAMETERS.filter((key) => annotations.parameters?.[key]).map(
    (key) => `parameters.${key}`,
  ),
  ...(['play', 'loaders', 'beforeEach', 'globals'] as const).filter(
    (key) => annotations[key],
  ),
];

/**
 * Composes a story file's stories for `StoryMatrix`, in the file's export order.
 *
 * A matrix cell renders only a story's args, `render` and decorators. Addon parameters
 * (`pseudo`, `backgrounds`, `viewport`), `play`, `loaders`, `beforeEach` and `globals` never
 * reach it, so a story or meta that sets one throws here instead of silently losing its
 * coverage: render that state through args, or `exclude` the story so it keeps its own snapshot.
 */
export const composeMatrixStories = (
  csf: CsfModule,
  { exclude = {}, withoutDecorators = [] }: MatrixStoryOptions = {},
): Record<string, ComponentType> => {
  const {
    default: meta,
    __namedExportsOrder: exportOrder,
    ...annotationsByName
  } = csf as CsfModule & { __namedExportsOrder?: string[] };
  const stories: Record<string, unknown> = annotationsByName;
  const names = (exportOrder ?? Object.keys(stories)).filter(
    (name) => name in stories && !(name in exclude),
  );

  const dropped = [
    ...configACellDrops(meta as Annotations).map((what) => `meta ${what}`),
    ...names.flatMap((name) =>
      configACellDrops(stories[name] as Annotations).map(
        (what) => `${name} ${what}`,
      ),
    ),
  ];
  if (dropped.length) {
    throw new Error(
      `${meta.title}: a matrix cell cannot apply ${dropped.join(', ')}. ` +
        'Render that state through args, or exclude the story from the matrix.',
    );
  }

  return composeStories({
    ...Object.fromEntries(names.map((name) => [name, stories[name]])),
    default: {
      ...meta,
      decorators: [meta.decorators ?? []]
        .flat()
        .filter((decorator) => !withoutDecorators.includes(decorator)),
    },
  } as CsfModule);
};

const Grid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, max-content);
  align-items: start;
  gap: 24px;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

/**
 * Renders stories from `composeMatrixStories` side by side under their keys, so a matrix story
 * can carry the snapshot of every variant. Import it from this file, not the `utils` barrel, for
 * the same TurboSnap reason as `NO_SNAPSHOT`.
 */
export const StoryMatrix = ({ stories, columns = 1 }: StoryMatrixProps) => (
  <Grid $columns={columns}>
    {Object.entries(stories).map(([name, Story]) => (
      <Cell key={name}>
        <span>{name}</span>
        <Story />
      </Cell>
    ))}
  </Grid>
);
