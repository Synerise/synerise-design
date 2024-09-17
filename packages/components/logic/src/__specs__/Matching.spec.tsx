import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Logic from '../Logic';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';

describe('Matching component', () => {
  it('Should render matching toggle with custom sentence', () => {
    // ARRANGE
    const onChange = jest.fn();
    // @ts-ignore
    const C = renderWithProvider(
      <Logic.Matching
        matching={true}
        onChange={onChange}
        sentence={'Find all items #MATCHING_TOGGLE# this condition.'}
        texts={{ matching: 'matching', notMatching: 'not matching' }}
      />
    );

    // ASSERT
    screen.getByText((content, node) => {
      const hasText = (node: Element): boolean => node.textContent === 'Find all items matching this condition.';
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(child => !hasText(child));

      return nodeHasText && childrenDontHaveText;
    });
  });

  it('Should render matching toggle in matching state', () => {
    // ARRANGE
    const onChange = jest.fn();
    const { getByText } = renderWithProvider(
      <Logic.Matching
        matching={true}
        onChange={onChange}
        texts={{ matching: 'matching', notMatching: 'not matching' }}
      />
    );

    // ASSERT
    expect(getByText('matching')).toBeTruthy();
  });
  it('Should render matching toggle in not matching state', () => {
    // ARRANGE
    const onChange = jest.fn();
    const { getByText } = renderWithProvider(
      <Logic.Matching
        matching={false}
        onChange={onChange}
        texts={{ matching: 'matching', notMatching: 'not matching' }}
      />
    );

    // ASSERT
    expect(getByText('not matching')).toBeTruthy();
  });
  it('Should call onChange callback', () => {
    // ARRANGE
    const onChange = jest.fn();
    const { getByText } = renderWithProvider(
      <Logic.Matching
        matching={false}
        onChange={onChange}
        texts={{ matching: 'matching', notMatching: 'not matching' }}
      />
    );

    // ACT
    userEvent.click(getByText('not matching'));

    // ASSERT
    expect(onChange).toBeCalled();
  });
});
