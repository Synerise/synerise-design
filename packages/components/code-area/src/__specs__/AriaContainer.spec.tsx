import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { AriaContainer } from '../components/AriaContainer';

describe('AriaContainer', () => {
  it('appends child nodes of the passed element to the ariaContainerRef', () => {
    const mockElement = document.createElement('div');
    const childNode = document.createElement('span');
    mockElement.appendChild(childNode);

    renderWithProvider(<AriaContainer element={mockElement} />);
    const ariaContainerDiv = screen.getByTestId('monaco-aria-container');

    expect(ariaContainerDiv).not.toBeNull();
    expect(ariaContainerDiv.contains(childNode)).toBe(true);
  });

  it('does not append child nodes if the passed element has no child nodes', () => {
    const mockElement = document.createElement('div');

    renderWithProvider(<AriaContainer element={mockElement} />);
    const ariaContainerDiv = screen.getByTestId('monaco-aria-container');

    expect(ariaContainerDiv).not.toBeNull();
    expect(ariaContainerDiv.childNodes.length).toBe(0);
  });
});
