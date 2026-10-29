import React from 'react';

import {
  declarationsFor,
  renderWithProvider,
  rulesFor,
} from '@synerise/ds-core/testing';
import { screen } from '@testing-library/react';

import { IconTooltipCell } from './IconTooltipCell';

describe('IconTooltipCell', () => {
  it('should render label', () => {
    renderWithProvider(<IconTooltipCell label="Tooltip Label" />);

    expect(screen.getByText('Tooltip Label')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    const icon = { component: <span data-testid="main-icon">icon</span> };
    renderWithProvider(<IconTooltipCell label="With Icon" icon={icon} />);

    expect(screen.getByText('With Icon')).toBeInTheDocument();
    expect(screen.getByTestId('main-icon')).toBeInTheDocument();
  });

  it('should render tooltip icon', () => {
    const tooltipIcon = {
      component: <span data-testid="tooltip-icon">info</span>,
    };
    renderWithProvider(
      <IconTooltipCell
        label="Info"
        tooltipIcon={tooltipIcon}
        tooltip={{ title: 'More info' }}
      />,
    );

    expect(screen.getByTestId('tooltip-icon')).toBeInTheDocument();
  });

  it('should render with disabled state', () => {
    const { container } = renderWithProvider(
      <IconTooltipCell label="Disabled" disabled />,
    );

    expect(screen.getByText('Disabled')).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});

const getSvgColourRules = (owner: Element) =>
  Array.from(owner.querySelectorAll('svg')).flatMap((svg) =>
    rulesFor(svg, { within: owner, state: 'any' }).filter(({ declarations }) =>
      /(^|;)(fill|color):/.test(declarations),
    ),
  );

describe('IconTooltipCell icon colours', () => {
  const renderCell = (iconColor?: string, tooltipIconColor?: string) => {
    const { container } = renderWithProvider(
      <IconTooltipCell
        label="Label"
        icon={{ component: <svg />, color: iconColor }}
        tooltipIcon={{ component: <svg />, color: tooltipIconColor }}
      />,
    );
    const cell = container.firstElementChild as HTMLElement;
    const icon = cell.querySelector('.main-icon') as HTMLElement;
    const tooltipIcon = cell.querySelector('.tooltip-icon') as HTMLElement;
    return { cell, icon, tooltipIcon };
  };

  it('colours default icons through the icon containers', () => {
    const { cell, icon, tooltipIcon } = renderCell();

    expect(icon?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(tooltipIcon?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(declarationsFor(icon, { within: cell })).toContain(
      'color:var(--ds-color-icon-base-default)',
    );
    expect(declarationsFor(tooltipIcon, { within: cell })).toContain(
      'color:var(--ds-color-icon-base-muted)',
    );
  });

  it('lets a consumer icon colour win over the cell defaults', () => {
    const { cell, icon, tooltipIcon } = renderCell(
      'var(--ds-color-icon-danger-default)',
      'var(--ds-color-icon-warning-default)',
    );

    expect(icon?.querySelector('svg')).toHaveStyle(
      'color: var(--ds-color-icon-danger-default)',
    );
    expect(tooltipIcon?.querySelector('svg')).toHaveStyle(
      'color: var(--ds-color-icon-warning-default)',
    );
    expect(getSvgColourRules(cell)).toEqual([]);
  });
});
