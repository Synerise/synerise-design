import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { Box, Flex } from '../index';

const CONTENT = 'CONTENT';
describe('FlexBox', () => {
  it('should render Flex', () => {
    renderWithProvider(<Flex>{CONTENT}</Flex>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });
  it('should render Box', () => {
    renderWithProvider(<Box>{CONTENT}</Box>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });
});
