import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core';

import { CONDITION_REMOVE_CLASS, CONDITION_ROWS_GAP } from '../constants';
import {
  ConditionAddButton,
  ConditionEntity,
  ConditionGroup,
  ConditionRemove,
  ConditionRow,
  ConditionRows,
  ConditionSlot,
  ConditionTextSlot,
} from '../index';

// jsdom has no layout engine, so the grow/shrink-within-bounds sizing is verified visually
// in Storybook. These specs cover rendering, prop wiring and interaction behaviour.

describe('ConditionSlot', () => {
  it('renders its child control', () => {
    const { getByText } = renderWithProvider(
      <ConditionSlot variant="fill">
        <span>control</span>
      </ConditionSlot>,
    );
    expect(getByText('control')).toBeInTheDocument();
  });

  it('forwards data-* to the slot element', () => {
    const { getByTestId } = renderWithProvider(
      <ConditionSlot data-testid="slot">x</ConditionSlot>,
    );
    expect(getByTestId('slot')).toBeInTheDocument();
  });

  it('renders an errorMessage below its control', () => {
    const { getByText } = renderWithProvider(
      <ConditionSlot variant="fill" errorMessage="Slot error">
        <span>control</span>
      </ConditionSlot>,
    );
    expect(getByText('Slot error')).toBeInTheDocument();
  });
});

describe('ConditionRow', () => {
  it('renders its children', () => {
    const { getByText, getByTestId } = renderWithProvider(
      <ConditionRow data-testid="row">
        <span>a</span>
        <span>b</span>
      </ConditionRow>,
    );
    expect(getByTestId('row')).toBeInTheDocument();
    expect(getByText('a')).toBeInTheDocument();
    expect(getByText('b')).toBeInTheDocument();
  });

  it('renders only the content column when no connector is given', () => {
    const { getByTestId } = renderWithProvider(
      <ConditionRow data-testid="row">
        <span>slot</span>
      </ConditionRow>,
    );
    // Just the content column — no leading connector.
    expect(getByTestId('row').childElementCount).toBe(1);
  });

  it('renders a leading connector when the connector prop is set', () => {
    const { getByTestId } = renderWithProvider(
      <ConditionRow data-testid="row" connector={{ first: true }}>
        <span>slot</span>
      </ConditionRow>,
    );
    // Connector cell + content column.
    expect(getByTestId('row').childElementCount).toBe(2);
  });

  it('renders an errorMessage below its slots', () => {
    const { getByText } = renderWithProvider(
      <ConditionRow errorMessage="Row error">
        <span>slot</span>
      </ConditionRow>,
    );
    expect(getByText('Row error')).toBeInTheDocument();
  });
});

describe('ConditionTextSlot', () => {
  it('renders the label', () => {
    const { getByText } = renderWithProvider(
      <ConditionTextSlot>Show only</ConditionTextSlot>,
    );
    expect(getByText('Show only')).toBeInTheDocument();
  });
});

describe('ConditionEntity', () => {
  it('renders the provided chip', () => {
    const { getByText } = renderWithProvider(
      <ConditionEntity>
        <button type="button">eobuwie</button>
      </ConditionEntity>,
    );
    expect(getByText('eobuwie')).toBeInTheDocument();
  });

  it('renders an errorMessage below the entity', () => {
    const { getByText } = renderWithProvider(
      <ConditionEntity errorMessage="Entity error">
        <button type="button">eobuwie</button>
      </ConditionEntity>,
    );
    expect(getByText('Entity error')).toBeInTheDocument();
  });
});

describe('ConditionAddButton', () => {
  it('renders its label and fires onClick', () => {
    const onClick = vi.fn();
    const { getByText } = renderWithProvider(
      <ConditionAddButton onClick={onClick}>and where</ConditionAddButton>,
    );
    fireEvent.click(getByText('and where'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a connector before the control when withConnector is set', () => {
    const { getByTestId, getByText } = renderWithProvider(
      <ConditionAddButton
        data-testid="add"
        withConnector
        connectorProps={{ first: true, last: true }}
      >
        <button type="button">add</button>
      </ConditionAddButton>,
    );
    expect(getByText('add')).toBeInTheDocument();
    // Connector cell + the add control.
    expect(getByTestId('add').childElementCount).toBe(2);
  });

  it('renders only the control when withConnector is not set', () => {
    const { getByTestId } = renderWithProvider(
      <ConditionAddButton data-testid="add">
        <button type="button">add</button>
      </ConditionAddButton>,
    );
    expect(getByTestId('add').childElementCount).toBe(1);
  });
});

describe('ConditionGroup', () => {
  it('renders the entity and the rows side by side', () => {
    const { getByTestId, getByText } = renderWithProvider(
      <ConditionGroup data-testid="group">
        <ConditionEntity>eobuwie</ConditionEntity>
        <ConditionRows>
          <ConditionRow>
            <span>slot</span>
          </ConditionRow>
        </ConditionRows>
      </ConditionGroup>,
    );
    expect(getByTestId('group').childElementCount).toBe(2);
    expect(getByText('eobuwie')).toBeInTheDocument();
    expect(getByText('slot')).toBeInTheDocument();
  });

  it('applies the default 12px gap and honours an override', () => {
    const { getByTestId, rerender } = renderWithProvider(
      <ConditionGroup data-testid="group">
        <span>child</span>
      </ConditionGroup>,
    );
    expect(window.getComputedStyle(getByTestId('group')).gap).toBe('12px');

    rerender(
      <ConditionGroup data-testid="group" gap="2rem">
        <span>child</span>
      </ConditionGroup>,
    );
    expect(window.getComputedStyle(getByTestId('group')).gap).toBe('2rem');
  });

  it('forwards its ref, which consumers pass as getPopupContainer', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithProvider(
      <ConditionGroup ref={ref}>
        <span>child</span>
      </ConditionGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('ConditionRows', () => {
  it('renders each row it is given', () => {
    const { getByTestId, getByText } = renderWithProvider(
      <ConditionRows data-testid="rows">
        <ConditionRow>
          <span>first</span>
        </ConditionRow>
        <ConditionRow>
          <span>second</span>
        </ConditionRow>
      </ConditionRows>,
    );
    expect(getByTestId('rows').childElementCount).toBe(2);
    expect(getByText('first')).toBeInTheDocument();
    expect(getByText('second')).toBeInTheDocument();
  });

  // The connector's vertical line is sized against CONDITION_ROWS_GAP, so the default gap and the
  // constant must not drift apart.
  it('defaults to the CONDITION_ROWS_GAP the connector bridges', () => {
    const { getByTestId } = renderWithProvider(
      <ConditionRows data-testid="rows">
        <span>row</span>
      </ConditionRows>,
    );
    expect(window.getComputedStyle(getByTestId('rows')).gap).toBe(
      `${CONDITION_ROWS_GAP}px`,
    );
  });

  it('accepts a CSS length as the gap', () => {
    const { getByTestId } = renderWithProvider(
      <ConditionRows data-testid="rows" gap="1.5rem">
        <span>row</span>
      </ConditionRows>,
    );
    expect(window.getComputedStyle(getByTestId('rows')).gap).toBe('1.5rem');
  });
});

describe('ConditionRemove', () => {
  it('renders an accessible remove button', () => {
    const { getByRole } = renderWithProvider(
      <ConditionRemove revealOnRowHover={false} />,
    );
    expect(getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('fires onClick', () => {
    const onClick = vi.fn();
    const { getByRole } = renderWithProvider(
      <ConditionRemove revealOnRowHover={false} onClick={onClick} />,
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('carries the reveal class so the row can toggle it on hover', () => {
    const { getByRole } = renderWithProvider(<ConditionRemove />);
    expect(getByRole('button', { name: 'Remove' }).className).toContain(
      CONDITION_REMOVE_CLASS,
    );
  });

  // The hover reveal must be visual only. Hiding with `visibility`/`display` drops the button
  // out of the accessibility tree and the focus order, which left keyboard and screen-reader
  // users with no way to remove a row at all (WCAG 2.1 AA 2.1.1).
  describe('while hover-revealed (the default)', () => {
    it('stays in the accessibility tree with its name', () => {
      const { getByRole } = renderWithProvider(<ConditionRemove />);
      // No `hidden: true` — the button must be exposed, not hidden from assistive tech.
      expect(getByRole('button', { name: 'Remove' })).toBeInTheDocument();
    });

    it('is hidden visually, not with visibility or display', () => {
      const { getByRole } = renderWithProvider(<ConditionRemove />);
      const style = window.getComputedStyle(getByRole('button', { name: 'Remove' }));

      expect(style.opacity).toBe('0');
      expect(style.visibility).not.toBe('hidden');
      expect(style.display).not.toBe('none');
    });

    it('can still be focused and activated by keyboard', () => {
      const onClick = vi.fn();
      const { getByRole } = renderWithProvider(
        <ConditionRow>
          <span>control</span>
          <ConditionRemove onClick={onClick} />
        </ConditionRow>,
      );
      const button = getByRole('button', { name: 'Remove' });

      button.focus();
      expect(button).toHaveFocus();

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  // The container owns the spacing: a margin on the button stacked on top of the row's gap.
  it('carries no left margin of its own, so a row gap is the only spacing', () => {
    const { getByRole } = renderWithProvider(
      <ConditionRow gap={12}>
        <span>control</span>
        <ConditionRemove revealOnRowHover={false} />
      </ConditionRow>,
    );
    const button = getByRole('button', { name: 'Remove' });
    // Not just "unset": anything non-zero would stack on top of the row's 12px gap.
    expect(['', '0px']).toContain(window.getComputedStyle(button).marginLeft);
  });

  it('is offset by 8px by the slot when nested in one', () => {
    const { getByRole } = renderWithProvider(
      <ConditionSlot variant="fill">
        <span>control</span>
        <ConditionRemove revealOnRowHover={false} />
      </ConditionSlot>,
    );
    const button = getByRole('button', { name: 'Remove' });
    expect(window.getComputedStyle(button).marginLeft).toBe('8px');
  });
});
