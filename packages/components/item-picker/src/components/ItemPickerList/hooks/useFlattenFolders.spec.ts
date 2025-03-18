import { renderHook } from '@testing-library/react';
import { useFlattenFolders } from './useFlattenFolders';

const NESTED_FOLDERS = [
  {
    id: 'ANALYTICS',
    text: 'Analytics',
    folders: [
      {
        id: 'ATTRIBUTES',
        text: 'Attributes',
        folders: [
          {
            id: 'ATTRIBUTES-READY-TO-USE',
            text: 'Ready to use',
          },
          {
            id: 'ATTRIBUTES-CONFIGURABLE',
            text: 'Configurable',
          },
        ],
      },
      {
        id: 'FUNNELS',
        text: 'Funnels',
      },
    ],
  },
];
const EXPECTED_FLATTENNED_ALL = [
  {
    id: 'ATTRIBUTES-READY-TO-USE',
    text: 'Ready to use',
    titles: ['Analytics', 'Attributes', 'Ready to use'],
  },
  {
    id: 'ATTRIBUTES-CONFIGURABLE',
    text: 'Configurable',
    titles: ['Analytics', 'Attributes', 'Configurable'],
  },
  { id: 'FUNNELS', text: 'Funnels', titles: ['Analytics', 'Funnels'] },
];
const EXPECTED_FLATTENNED_CHILDREN = [
  {
    id: 'ATTRIBUTES-READY-TO-USE',
    text: 'Ready to use',
    titles: ['Attributes', 'Ready to use'],
  },
  {
    id: 'ATTRIBUTES-CONFIGURABLE',
    text: 'Configurable',
    titles: ['Attributes', 'Configurable'],
  },
];
const SECTION_LVL_1 = NESTED_FOLDERS[0].folders[0];
const SECTION_LVL_2 = NESTED_FOLDERS[0].folders[0].folders![0];

describe('useFlattenFolders', () => {
  it('Should flatten folder structure', () => {
    const { result } = renderHook(() => useFlattenFolders({ sections: NESTED_FOLDERS }));
    const { allFolders } = result.current;
    expect(allFolders).toEqual(EXPECTED_FLATTENNED_ALL);
  });

  it('Should return flattened child folders', () => {
    const { result } = renderHook(() => useFlattenFolders({ sections: NESTED_FOLDERS, currentSection: SECTION_LVL_1 }));
    const { currentPath, childFolders } = result.current;
    expect(childFolders).toEqual(EXPECTED_FLATTENNED_CHILDREN);
  });

  it('Should return path and parentFolder for 2nd level folder', () => {
    const { result } = renderHook(() => useFlattenFolders({ sections: NESTED_FOLDERS, currentSection: SECTION_LVL_2 }));
    const { parentFolder, currentPath, childFolders } = result.current;
    expect(parentFolder).toEqual(SECTION_LVL_1);
    expect(childFolders).toBeFalsy();
    expect(currentPath).toEqual(['Analytics', 'Attributes','Ready to use']);
  });
});
