import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-utils';

import Logic from '../Logic';

describe('Matching component', () => {
  it('Should render matching toggle with custom sentence', () => {
    const onChange = jest.fn();
    
    renderWithProvider(
      <Logic.Matching
        matching={true}
        onChange={onChange}
        sentence={'Find all items #MATCHING_TOGGLE# this condition.'}
        texts={{ matching: 'matching', notMatching: 'not matching' }}
      />
    );

    screen.getByText((content, node) => {
      const hasText = (element: Element): boolean => element.textContent === 'Find all items matching this condition.';
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(child => !hasText(child));

      return nodeHasText && childrenDontHaveText;
    });
  });

  it('Should render matching toggle in matching state', () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvider(
      <Logic.Matching
        matching={true}
        onChange={onChange}
        texts={{ matching: 'matching', notMatching: 'not matching' }}
      />
    );

    expect(getByText('matching')).toBeTruthy();
  });
  it('Should render matching toggle in not matching state', () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvider(
      <Logic.Matching
        matching={false}
        onChange={onChange}
        texts={{ matching: 'matching', notMatching: 'not matching' }}
      />
    );

    expect(getByText('not matching')).toBeTruthy();
  });
  it('Should call onChange callback', () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvider(
      <Logic.Matching
        matching={false}
        onChange={onChange}
        texts={{ matching: 'matching', notMatching: 'not matching' }}
      />
    );

    userEvent.click(getByText('not matching'));

    expect(onChange).toBeCalled();
  });
});
