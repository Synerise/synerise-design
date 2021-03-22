import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { TreeMenuItems } from 'TreeMenu.types';
import TreeMenu from './TreeMenu';

const dataSource: TreeMenuItems = [
  { name: 'Label 1', type: 'folder' },
  { name: 'Label 2', type: 'folder' },
  { name: 'Label 3', type: 'folder' },
  { name: 'Label 4', type: 'folder' },
  { name: 'Label 5', type: 'folder' },
];

describe('TreeMenu', () => {
  it(`should have ${dataSource.length} items + ghost item`, () => {
    const { getByText, getAllByRole } = renderWithProvider(<TreeMenu dataSource={dataSource} />);
    expect(getAllByRole('menuitem')).toHaveLength(6);
    dataSource.forEach(data => {
      expect(getByText(data.name)).toBeTruthy();
    });
  });
});
