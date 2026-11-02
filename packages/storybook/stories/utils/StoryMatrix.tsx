import type { ComponentType } from 'react';
import React from 'react';
import styled from 'styled-components';

type StoryMatrixProps = {
  stories: Record<string, ComponentType>;
  columns?: number;
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
 * Renders stories from `composeStories` side by side under their keys, so a matrix story can
 * carry the snapshot of every variant. Import it from this file, not the `utils` barrel, for the
 * same TurboSnap reason as `NO_SNAPSHOT`.
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
