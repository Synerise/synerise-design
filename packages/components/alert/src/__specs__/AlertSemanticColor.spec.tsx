import { renderWithProvider } from '@synerise/ds-core';
import React from 'react';
import AlertSemanticColor from '../ColorSemantic/AlertSemanticColor';

describe('Inline alert', () => {
  it('Should render as positive', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <AlertSemanticColor type={'positive'}/>
    );

    // ASSERT
    expect(container.querySelector('.check-3-m')).toBeTruthy();

  });
  it('Should render as alert', () => {
    // ARRANGE
    const {  container } = renderWithProvider(<AlertSemanticColor type={'notice'}/>);

    // ASSERT
    expect(container.querySelector('.warning-fill-m')).toBeTruthy();
  });
  it('Should render as warning', () => {
    // ARRANGE
    const {  container } = renderWithProvider(
      <AlertSemanticColor type={'negative'}/>
    );

    // ASSERT
    expect(container.querySelector('.warning-fill-m')).toBeTruthy();
  });
})
