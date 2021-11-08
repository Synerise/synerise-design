import * as React from 'react';
import { CONTEXT_TEXTS, CONTEXT_ITEMS, CONTEXT_GROUPS } from './data/index.data';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { ApiM } from '@synerise/ds-icon';
import ContextSelector from '../ContextSelector';
import { ContextProps } from './../ContextSelector.types';

const DEFAULT_PROPS: ContextProps = {
  texts: CONTEXT_TEXTS,
  onSelectItem: () => {},
  selectedItem: undefined,
  items: CONTEXT_ITEMS,
  groups: CONTEXT_GROUPS,
};
const RENDER_CONTEXT_SELECTOR = (props?: Partial<ContextProps>) => <ContextSelector {...DEFAULT_PROPS} {...props} />;

describe('Context selector component', () => {
  test('Should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(RENDER_CONTEXT_SELECTOR());
    // ASSERT
    expect(getByText(CONTEXT_TEXTS.buttonLabel)).toBeTruthy();
  });

  test('Should show selected value', () => {
    const { getByText } = renderWithProvider(
      RENDER_CONTEXT_SELECTOR({
        selectedItem: {
          name: 'Schema builder app',
          id: 'SCHEMA_BUILDER_APP',
          icon: <ApiM />,
          groupId: 'RECENT',
          groupName: 'Internal apps',
        },
      })
    );

    expect(getByText('Schema builder app')).toBeTruthy();
  });
});
