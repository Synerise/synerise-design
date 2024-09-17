import React from 'react';
import styled from 'styled-components';
import renderWithProvider from './renderWithProvider';

const Div = styled.div`
  color: ${(props): string => props.theme.palette['red-800']};
`;

const Component: React.FC = () => <Div>test</Div>;

describe('renderWithProvider', () => {
  it('shoud render with theme provider', () => {
    const C = renderWithProvider(<Component />);
    expect(C).toBeTruthy();
  });
});
