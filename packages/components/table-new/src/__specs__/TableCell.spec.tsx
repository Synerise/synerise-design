import React from 'react';

import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import { screen } from '@testing-library/react';

import { Table } from '../Table';
import { COLUMNS, DATA } from './data';

const cellWrapperOf = (container: HTMLElement) =>
  container.querySelector('td > div');

const pxOf = (declarations: string, property: string) =>
  declarations.match(new RegExp(`(?:^|;)${property}:(-?\\d+)px 0`))?.[1];

describe('table cell wrapper', () => {
  it('gives a child room to paint outside itself without changing the row', () => {
    const { container } = renderWithProvider(
      <Table data={DATA} columns={COLUMNS} />,
    );

    const declarations = declarationsFor(cellWrapperOf(container));
    const padding = pxOf(declarations, 'padding');
    const margin = pxOf(declarations, 'margin');

    // The wrapper hugs its content, so an avatar's icon-tile shadow would be clipped at its
    // edge. The padding grows the clip box; the negative margin cancels it, so the row keeps
    // its height.
    expect(Number(padding)).toBeGreaterThan(0);
    expect(Number(margin)).toBe(-Number(padding));
  });

  it('still clips, so long content cannot spill into the next column', () => {
    const { container } = renderWithProvider(
      <Table data={DATA} columns={COLUMNS} />,
    );

    const declarations = declarationsFor(cellWrapperOf(container));

    expect(declarations).toContain('overflow:hidden');
    // Only vertical room is added: a horizontal pad would let text bleed sideways.
    expect(declarations).toMatch(/padding:\d+px 0/);
  });

  it('renders cell content inside the wrapper', () => {
    renderWithProvider(<Table data={DATA} columns={COLUMNS} />);

    expect(screen.getByText(DATA[0].name)).toBeInTheDocument();
  });
});
