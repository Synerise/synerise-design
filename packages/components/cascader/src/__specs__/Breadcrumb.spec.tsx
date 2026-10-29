import React from 'react';

import { renderWithProvider, rulesFor } from '@synerise/ds-core/testing';
import Icon, { HomeM } from '@synerise/ds-icon';
import { screen } from '@testing-library/react';

import Cascader from '../Cascader';
import { type Category } from '../Cascader.types';
import { Breadcrumb } from '../Elements/Breadcrumb/Breadcrumb';
import { Navigation } from '../Elements/Navigation/Navigation';

const BASE_COLOR = 'var(--ds-color-icon-base-default)';
const BRAND_COLOR = 'var(--ds-color-icon-brand-default)';
const PATH = ['Home', 'Phone', 'Cables'];

const category: Category = { id: 1, name: 'Cables', path: PATH };

// ListItem renders its own (empty) prefix slot with the same test id.
const getIconPrefix = () =>
  screen
    .getAllByTestId('list-item-prefix')
    .find((element) => element.querySelector('.ds-icon')) as HTMLElement;

// Every hover rule styling the wrapper, its own `:hover` or an ancestor's.
const hoverColours = (wrapper: Element) =>
  rulesFor(wrapper, { state: 'any' })
    .filter(({ selector }) => selector.includes(':hover'))
    .map(({ declarations }) => declarations)
    .join(';');

// Rules the wrapper sets on an icon svg inside it, which would beat the icon's
// own `color`.
const svgRulesFrom = (wrapper: Element) =>
  rulesFor(wrapper.querySelector('svg'), { within: wrapper, state: 'any' });

describe('Breadcrumb icon colour', () => {
  it('colours the arrow wrapper instead of the arrow svg', () => {
    const { container } = renderWithProvider(<Breadcrumb path={PATH} />);

    const arrow = container.querySelector('.ds-arrow') as HTMLElement;
    const arrowIcon = arrow.querySelector('.ds-icon') as HTMLElement;

    expect(arrowIcon?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(arrow).toHaveStyle(`color: ${BASE_COLOR}`);
    expect(svgRulesFrom(arrow)).toEqual([]);
    expect(hoverColours(arrow)).toContain(`color:${BRAND_COLOR}`);
  });

  it('leaves an explicit colour on a consumer prefix icon alone', () => {
    renderWithProvider(
      <Breadcrumb
        path={PATH}
        onPathClick={vi.fn()}
        prefixel={
          <Icon
            component={<HomeM />}
            color="var(--ds-color-icon-danger-default)"
          />
        }
      />,
    );

    const prefix = getIconPrefix();

    expect(svgRulesFrom(prefix)).toEqual([]);
    expect(hoverColours(prefix)).toContain(`color:${BRAND_COLOR}`);
  });
});

describe('Cascader navigation icon colour', () => {
  it('lets the home icon follow the prefix wrapper colour', () => {
    renderWithProvider(
      <Navigation
        breadcrumbVisible
        activeCategory={category}
        previousCategory={category}
        onHomeIconClick={vi.fn()}
        onPathClick={vi.fn()}
      />,
    );

    const prefix = getIconPrefix();
    const homeIcon = prefix.querySelector('.ds-icon') as HTMLElement;

    expect(homeIcon?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(prefix).toHaveStyle(`color: ${BASE_COLOR}`);
    expect(svgRulesFrom(prefix)).toEqual([]);
    expect(hoverColours(prefix)).toContain(`color:${BRAND_COLOR}`);
  });

  it('renders the search icon without a colour prop', () => {
    const { container } = renderWithProvider(
      <Cascader
        categorySuffix={<div>select</div>}
        rootCategory={{ id: 0, name: 'Home', path: ['Home'] }}
        selectedCategoriesIds={[]}
      />,
    );

    const searchIcon = container.querySelector(
      '.ds-cascader .ds-icon',
    ) as HTMLElement;

    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon?.querySelector('svg')).toHaveStyle('color: inherit');
  });
});
