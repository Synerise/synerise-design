import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { Flex, Box } from '../index';

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
