import React from 'react';

import { ApiM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContextSelector from '../ContextSelector';
import { type ContextProps } from '../ContextSelector.types';
import {
  CONTEXT_GROUPS,
  CONTEXT_ITEMS,
  CONTEXT_TEXTS,
} from './data/index.data';

const DEFAULT_PROPS: ContextProps = {
  texts: CONTEXT_TEXTS,
  onSelectItem: () => {},
  selectedItem: undefined,
  items: CONTEXT_ITEMS,
  groups: CONTEXT_GROUPS,
};
const RENDER_CONTEXT_SELECTOR = (props?: Partial<ContextProps>) => (
  <ContextSelector {...DEFAULT_PROPS} {...props} />
);

describe('Context selector component', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  test('Should render', () => {
    renderWithProvider(RENDER_CONTEXT_SELECTOR());

    expect(screen.getByText(CONTEXT_TEXTS.buttonLabel)).toBeTruthy();
  });

  test('Should show selected value', () => {
    renderWithProvider(
      RENDER_CONTEXT_SELECTOR({
        selectedItem: {
          name: 'Schema builder app',
          id: 'SCHEMA_BUILDER_APP',
          icon: <ApiM />,
          groupId: 'RECENT',
          groupName: 'Internal apps',
        },
      }),
    );

    expect(screen.getByText('Schema builder app')).toBeTruthy();
  });

  test('should call onActivate', () => {
    const handleActivate = jest.fn();
    renderWithProvider(RENDER_CONTEXT_SELECTOR({ onActivate: handleActivate }));

    userEvent.click(screen.getByText(CONTEXT_TEXTS.buttonLabel));

    expect(handleActivate).toBeCalled();
  });
  test('should call onDeactivate', async () => {
    const handleDeactivate = jest.fn();
    const handleActivate = jest.fn();
    renderWithProvider(
      RENDER_CONTEXT_SELECTOR({
        onActivate: handleActivate,
        onDeactivate: handleDeactivate,
      }),
    );

    userEvent.click(screen.getByText(CONTEXT_TEXTS.buttonLabel));
    await waitFor(() => expect(handleActivate).toHaveBeenCalled());
    userEvent.click(document.body);

    await waitFor(() => expect(handleDeactivate).toHaveBeenCalled());
  });

  test('should display the correct item when searched by subtitle', async () => {
    renderWithProvider(
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
        ],
      }),
    );

    userEvent.click(screen.getByText(CONTEXT_TEXTS.buttonLabel));

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(CONTEXT_TEXTS.searchPlaceholder),
      ).toBeInTheDocument(),
    );
    const searchInput = screen.getByPlaceholderText(
      CONTEXT_TEXTS.searchPlaceholder,
    );
    await userEvent.type(searchInput, 'subtitle 2');

    expect(screen.queryByText('Name 2')).toBeInTheDocument();
    expect(screen.queryByText('Name 1')).not.toBeInTheDocument();
  });

  test('Should hide search field if hideSearchField is true', () => {
    const { queryByPlaceholderText } = renderWithProvider(
      RENDER_CONTEXT_SELECTOR({
        hideSearchField: true,
      }),
    );
    const searchField = queryByPlaceholderText(CONTEXT_TEXTS.searchPlaceholder);

    expect(searchField).toBeNull();
  });
  test('Should render error message', () => {
    const ERROR_MESSAGE = 'ERROR_MESSAGE';
    renderWithProvider(
      RENDER_CONTEXT_SELECTOR({
        errorText: ERROR_MESSAGE,
      }),
    );
    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });

  test('Should render error style without an error message', () => {
    renderWithProvider(
      RENDER_CONTEXT_SELECTOR({
        isError: true,
      }),
    );
    expect(screen.getByRole('button')).toHaveStyle({
      backgroundColor: '#ffece8',
    });
  });
});
