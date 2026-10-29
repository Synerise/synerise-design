import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { screen, waitFor } from '@testing-library/react';

import Icon, { Add2M, AddL, AddXl, SearchM } from '../index';

describe('Icon', () => {
  it('should render', () => {
    const TEST_TEXT = 'angle-left-m';
    renderWithProvider(<Icon title={TEST_TEXT} name={TEST_TEXT} />);

    expect(screen.getByTitle(TEST_TEXT)).toBeTruthy();
  });

  it('Should render with className', async () => {
    const { container } = renderWithProvider(<Icon iconName="VarTypeStringM" />);

    await waitFor(() =>
      expect(container.querySelector('.var-type-string-m')).toBeTruthy(),
    );
  });

  it('Should render with testid', async () => {
    renderWithProvider(<Icon iconName="VarTypeStringM" />);

    expect(
      await screen.findByTestId('ds-icon-var-type-string-m'),
    ).toBeTruthy();
  });

  it('colours the svg from the color prop without passing it to the DOM', () => {
    const { container } = renderWithProvider(
      <Icon component={<SearchM />} color="var(--ds-color-icon-brand-default)" />,
    );

    expect(container.querySelector('.ds-icon')).not.toHaveAttribute('color');
    expect(container.querySelector('svg')).toHaveStyle(
      'color: var(--ds-color-icon-brand-default)',
    );
  });

  it('lets the svg inherit its colour when no color prop is passed', () => {
    const { container } = renderWithProvider(<Icon component={<SearchM />} />);

    expect(container.querySelector('svg')).toHaveStyle('color: inherit');
  });

  it.each([
    { size: 'L', component: <AddL /> },
    { size: 'XL', component: <AddXl /> },
  ])('gives an uncoloured $size icon the strong icon colour', ({ component }) => {
    const { container } = renderWithProvider(<Icon component={component} />);

    expect(container.querySelector('svg')).toHaveStyle({
      color: 'var(--ds-color-icon-base-strong)',
    });
  });

  it('lets an uncoloured M icon inherit its colour', () => {
    const { container } = renderWithProvider(<Icon component={<Add2M />} />);

    expect(container.querySelector('svg')).not.toHaveStyle({
      color: 'var(--ds-color-icon-base-strong)',
    });
  });

  it('applies an explicit color to an L icon instead of the strong default', () => {
    const { container } = renderWithProvider(
      <Icon component={<AddL />} color="var(--ds-color-icon-brand-default)" />,
    );

    expect(container.querySelector('svg')).toHaveStyle({
      color: 'var(--ds-color-icon-brand-default)',
    });
  });
});
