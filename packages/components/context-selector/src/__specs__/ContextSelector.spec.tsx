import * as React from 'react';
import { CONTEXT_TEXTS, CONTEXT_ITEMS, CONTEXT_GROUPS } from './data/index.data';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { ApiM } from '@synerise/ds-icon';
import ContextSelector from '../ContextSelector';
import { ContextProps } from './../ContextSelector.types';
import userEvent from '@testing-library/user-event';

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

  test('should call onActivate', () => {
    // ARRANGE
    const handleActivate = jest.fn();
    const { getByText } = renderWithProvider(RENDER_CONTEXT_SELECTOR({ onActivate: handleActivate }));

    // ACT
    userEvent.click(getByText(CONTEXT_TEXTS.buttonLabel));

    // ASSERT
    expect(handleActivate).toBeCalled();
  });
  test('should call onDeactivate', () => {
    // ARRANGE
    const handleDeactivate = jest.fn();
    const { getByText } = renderWithProvider(RENDER_CONTEXT_SELECTOR({ onDeactivate: handleDeactivate }));

    // ACT
    userEvent.click(getByText(CONTEXT_TEXTS.buttonLabel));
    userEvent.click(document.body);

    expect(handleDeactivate).toBeCalled();
  });

  test("should display the correct item when searched by subtitle", async () => {
    const { getByText , getByPlaceholderText, queryByText } = renderWithProvider(
        RENDER_CONTEXT_SELECTOR({
          items: [
            {
              name: 'Name 1',
              id: 'id_1',
              icon: <ApiM />,
            },
            {
              name: 'Name 2',
              subtitle: 'subtitle 2',
              id: 'id_2',
              icon: <ApiM />,
            },
          ]
        })
    );

    userEvent.click(getByText(CONTEXT_TEXTS.buttonLabel));

    const searchInput = getByPlaceholderText(CONTEXT_TEXTS.searchPlaceholder);
    await userEvent.type(searchInput, 'subtitle 2');

    expect(queryByText("Name 2")).toBeInTheDocument();
    expect(queryByText("Name 1")).not.toBeInTheDocument();
  })
});
