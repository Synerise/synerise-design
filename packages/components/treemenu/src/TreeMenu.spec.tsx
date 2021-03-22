import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { TreeData } from './TreeMenu.types';
import TreeMenu from './TreeMenu';

const dataSource: TreeData[] = [
  { title: 'Label 1', key: 1, type: 'folder' },
  { title: 'Label 2', key: 2, type: 'folder' },
  { title: 'Label 3', key: 3, type: 'folder' },
  { title: 'Label 4', key: 4, type: 'folder' },
  { title: 'Label 5', key: 5, type: 'folder' },
];

describe('TreeMenu', () => {
  it(`should have ${dataSource.length} items + ghost item`, () => {
    const { getByText, getAllByRole } = renderWithProvider(<TreeMenu dataSource={dataSource} />);
    expect(getAllByRole('menuitem')).toHaveLength(6);
    dataSource.forEach(data => {
      expect(getByText(data.title as string)).toBeTruthy();
    });
  });
});
