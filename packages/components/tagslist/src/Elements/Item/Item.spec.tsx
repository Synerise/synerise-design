import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import { TagsListItem } from '../../TagsList.types';
import TagsListContext, { defaultValue } from '../../TagsListContext';
import Item from './Item';

const item: TagsListItem = { name: 'Bangkok', id: '1', canDelete: true, canUpdate: true };

describe('Item', () => {
  it('should render with normal icon', () => {
    const { container, getByText } = renderWithProvider(<Item item={item} texts={{}} />);
    expect(getByText('Bangkok')).toBeTruthy();
    expect(container.querySelector('.tag-m')).toBeTruthy();
    expect(container.querySelector('.tag-starred-m')).toBeFalsy();
  });

  it('should render favourite icon', () => {
    const favItem = { ...item, favourite: true };
    const { container } = renderWithProvider(<Item item={favItem} texts={{}} />);
    expect(container.querySelector('.tag-starred-m')).toBeTruthy();
  });

  it('on search it should highlight', () => {
    const favItem = { ...item, favourite: true };
    const contextValue = { ...defaultValue, searchQuery: 'bang' };
    const { container } = renderWithProvider(
      <TagsListContext.Provider value={contextValue}>
        <Item item={favItem} texts={{}} />
      </TagsListContext.Provider>
    );
    expect(container.querySelector('mark')?.innerHTML).toEqual('Bang');
  });
});
