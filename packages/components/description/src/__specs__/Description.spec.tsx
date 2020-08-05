import * as React from 'react';
import Description from '../Description';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { DescriptionRow } from '../index';
import { DescriptionRowProps } from '../Row/DescriptionRow';

const DESCRIPTION = (props?: Omit<DescriptionRowProps, 'label' | 'value' | 'intl' >) => (
  <Description type='inline'>
    <DescriptionRow label="Name" value="John Kowalski" {...props} />
  </Description>
);

describe('Description component', () => {
  it('should render label and value', () => {
    const {getByText} = renderWithProvider(<DESCRIPTION />);
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('John Kowalski')).toBeTruthy();
  });

  it('should render prefix and value', () => {
    const {getByText} = renderWithProvider(<DESCRIPTION prefixEl="Prefix" />);
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('John Kowalski')).toBeTruthy();
    expect(getByText('Prefix')).toBeTruthy();
  });

  it('should render suffix and value', () => {
    const {getByText} = renderWithProvider(<DESCRIPTION suffixEl="Suffix" />);
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('John Kowalski')).toBeTruthy();
    expect(getByText('Suffix')).toBeTruthy();
  });

  it('should render with star icon', () => {
    const {getByText, container} = renderWithProvider(<DESCRIPTION starType='active' />);
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('John Kowalski')).toBeTruthy();
    expect(container.querySelector('.ds-description-star')).toBeTruthy();
  });

  it('should render with copy icon', () => {
    const {getByText, container} = renderWithProvider(<DESCRIPTION copyValue='active' />);
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('John Kowalski')).toBeTruthy();
    expect(container.querySelector('.ds-description-copy')).toBeTruthy();
  });
});
