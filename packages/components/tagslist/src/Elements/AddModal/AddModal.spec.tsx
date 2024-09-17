import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, act } from '@testing-library/react';
import AddModal from './AddModal';
import { TagsListItem } from '../../TagsList.types';
import Providers from '../../TestProviders';

const TAGS: TagsListItem[] = [
  { name: 'Bangkok', id: '1', canDelete: true, canUpdate: true },
  { name: 'Paris', id: '2', canDelete: true },
  { name: 'Alaska', id: '3', canDelete: true },
  { name: 'Zaragoza', id: '4', canDelete: true },
];

describe('AddModal', () => {
  it('should render with tags and button triggers', () => {
    const { container, getByRole } = renderWithProvider(
      <Providers>
        <div data-popup-container>
          <AddModal items={TAGS} />
        </div>
      </Providers>
    );
    expect(container.querySelector('.ant-dropdown')).toBeFalsy();
    fireEvent.click(getByRole('button'));
    expect(container.querySelector('.ant-dropdown')).toBeTruthy();
  });

  it('should trigger onItemsAdd', () => {
    const onItemsAdd = jest.fn();

    const { container, getByRole, getByText } = renderWithProvider(
      <Providers>
        <div data-popup-container>
          <AddModal items={TAGS} onItemsAdd={onItemsAdd} />
        </div>
      </Providers>
    );

    expect(container.querySelector('.ant-dropdown')).toBeFalsy();

    act((): void => {
      fireEvent.click(getByRole('button'));
    });

    expect(container.querySelector('.ant-dropdown')).toBeTruthy();
    expect(onItemsAdd).toBeCalledTimes(0);

    fireEvent.click(container.querySelector('.ds-checkbox') as HTMLElement);
    fireEvent.click(getByText('Apply'));

    expect(onItemsAdd).toBeCalledTimes(1);
  });
});
