import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';

import TagsList from './TagsList';
import { TagsListItem } from './TagsList.types';
import Providers from './TestProviders';

const TAGS: TagsListItem[] = [
  { name: 'Bangkok', id: '1', canDelete: true, canUpdate: true },
  { name: 'Paris', id: '2', canDelete: true },
  { name: 'Alaska', id: '3', canDelete: true },
  { name: 'Zaragoza', id: '4', canDelete: true },
];

describe('TagsList', () => {
  it('should render items then `defaultItems` passed', () => {
    const { getByText } = renderWithProvider(
      <Providers>
        <TagsList defaultItems={TAGS} />
      </Providers>
    );
    expect(getByText('Bangkok')).toBeTruthy();
    expect(getByText('Paris')).toBeTruthy();
    expect(getByText('Alaska')).toBeTruthy();
    expect(getByText('Zaragoza')).toBeTruthy();
  });

  it('should throw exception if controlled and no onChange method', () => {
    expect(() => {
      renderWithProvider(
        <Providers>
          <TagsList items={TAGS} />
        </Providers>
      );
    }).toThrow();
  });

  it('fire onChange when item is clicked', () => {
    const onChange = jest.fn();
    const { getAllByRole } = renderWithProvider(
      <Providers>
        <TagsList items={TAGS} onChange={onChange} />
      </Providers>
    );
    const item = getAllByRole('menuitem').shift() as HTMLElement;
    fireEvent.click(item);
    expect(onChange).toBeCalled();
  });
});
