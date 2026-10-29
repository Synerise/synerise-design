import React from 'react';

import {
  declarationsFor,
  renderWithProvider,
  rulesFor,
} from '@synerise/ds-core/testing';
import { VarTypeStringM } from '@synerise/ds-icon';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { type FactorsProps } from '../Factors.types';
import Factors from './../Factors';
import {
  FACTORS_GROUPS,
  FACTORS_ITEMS,
  FACTORS_TEXTS,
} from './data/Factors.data';

const DEFAULT_PROPS: FactorsProps = {
  selectedFactorType: '',
  setSelectedFactorType: () => {},
  value: '',
  onChangeValue: () => {},
  textType: 'default',
  defaultFactorType: 'text',
  unavailableFactorTypes: [],
  parameters: {
    buttonLabel: 'Parameter',
    buttonIcon: <VarTypeStringM />,
    groups: FACTORS_GROUPS,
    items: FACTORS_ITEMS,
  },
  withoutTypeSelector: true,
  texts: FACTORS_TEXTS,
};

// Selectors of the rules that reach an icon's svg through `container`.
const svgSelectors = (container: Element) =>
  rulesFor(container.querySelector('svg'), {
    within: container,
    state: 'any',
  }).map(({ selector }) => selector);

describe('Factors icon colour', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  it('lets the expansible text icon follow its wrapper colour', () => {
    renderWithProvider(
      <Factors
        {...DEFAULT_PROPS}
        selectedFactorType="text"
        textType="expansible"
      />,
    );

    const icon = screen
      .getByTestId('ds-factors-expansible-icon')
      .closest('.ds-icon') as HTMLElement;
    const wrapper = icon.parentElement as HTMLElement;

    expect(icon?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(wrapper).toHaveStyle('color: var(--ds-form-icon-color-default)');
    expect(svgSelectors(wrapper)).toEqual([]);
    expect(declarationsFor(wrapper, { state: ':hover' })).toContain(
      'color:var(--ds-color-icon-brand-default)',
    );
  });

  it('colours the relative date clear icon container, not its svg', () => {
    const { container } = renderWithProvider(
      <Factors
        {...DEFAULT_PROPS}
        selectedFactorType="relativeDate"
        allowClear
        value={{ temporalUnit: 'HOURS', temporalModifier: -10 }}
      />,
    );

    const [chevronIcon, clearIcon] = Array.from(
      container.querySelectorAll('.icon1 > .ds-icon'),
    ) as HTMLElement[];
    // Every Icon styles its own svg; only rules beyond those the chevron shares count.
    const iconSvgSelectors = new Set(svgSelectors(chevronIcon));

    expect(clearIcon?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(clearIcon).toHaveStyle(
      'color: var(--ds-color-icon-danger-default)',
    );
    expect(
      svgSelectors(clearIcon).filter((selector) => !iconSvgSelectors.has(selector)),
    ).toEqual([]);
    expect(declarationsFor(clearIcon, { state: ':hover' })).toContain(
      'color:var(--ds-color-icon-danger-defaulthover)',
    );
  });

  it('renders the parameter search icon without a colour prop', async () => {
    renderWithProvider(
      <Factors {...DEFAULT_PROPS} selectedFactorType="parameter" />,
    );

    await userEvent.click(screen.getByText('Parameter'));
    const searchInput = await screen.findByPlaceholderText(
      FACTORS_TEXTS.parameter.searchPlaceholder,
    );
    const searchBar = searchInput.closest(
      '[data-testid="input-wrapper"]',
    ) as HTMLElement;
    const searchIcon = searchBar.querySelector('.ds-icon') as HTMLElement;

    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon?.querySelector('svg')).toHaveStyle('color: inherit');
  });
});
