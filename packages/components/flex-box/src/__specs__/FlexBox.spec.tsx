import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { Box, Flex } from '../index';

const CONTENT = 'CONTENT';

const getInjectedStyles = (): string =>
  Array.from(document.querySelectorAll('style'))
    .map((node) => node.textContent ?? '')
    .join('\n');

const getRulesFor = (element: Element): string => {
  const styles = getInjectedStyles();
  return Array.from(element.classList)
    .map((cls) => styles.match(new RegExp(`\\.${cls}\\{[^}]*\\}`, 'g')) ?? [])
    .flat()
    .join('\n');
};

describe('FlexBox', () => {
  it('should render Flex', () => {
    renderWithProvider(<Flex>{CONTENT}</Flex>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });
  it('should render Box', () => {
    renderWithProvider(<Box>{CONTENT}</Box>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });
  it('should map numeric gap to theme.space scale', () => {
    renderWithProvider(<Flex gap={2}>{CONTENT}</Flex>);
    expect(getRulesFor(screen.getByText(CONTENT))).toContain('gap:12px');
  });
  it('should pass string gap through verbatim', () => {
    renderWithProvider(<Flex gap="1rem">{CONTENT}</Flex>);
    expect(getRulesFor(screen.getByText(CONTENT))).toContain('gap:1rem');
  });
  it('should not emit a gap rule when prop is omitted', () => {
    renderWithProvider(<Flex>{CONTENT}</Flex>);
    expect(getRulesFor(screen.getByText(CONTENT))).not.toMatch(/\bgap:/);
  });
});
