import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { NotificationsM, VarTypeStringM } from '@synerise/ds-icon';
import { SubjectProps } from '../Subject.types';
import Subject from '../Subject';
import { fireEvent, waitFor, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const SUBJECT_TEXTS = {
  searchPlaceholder: 'Search',
  noResults: 'No results',
};

export const SUBJECT_ITEMS = [...new Array(30)].map((i, index) => ({
  id: index,
  name: `Attribute #${index}`,
  icon: <NotificationsM />,
}));

describe('Subject component', () => {
  const DEFAULT_PROPS: SubjectProps = {
    texts: SUBJECT_TEXTS,
    onSelectItem: () => { },
    onShowPreview: () => { },
    type: 'event',
    placeholder: 'Choose event',
    iconPlaceholder: <NotificationsM />,
    selectedItem: undefined,
    items: SUBJECT_ITEMS,
  };

  const RENDER_SUBJECT = (props?: {}) => <Subject {...DEFAULT_PROPS} {...props} />;

  test('Should render with custom placeholder', () => {
    const PLACEHOLDER = 'Choose parameter';
    renderWithProvider(RENDER_SUBJECT({ placeholder: PLACEHOLDER }));

    expect(screen.getByText(PLACEHOLDER)).toBeInTheDocument();
  });

  test('Should render without showPreview button', () => {
    const PLACEHOLDER = 'Choose parameter';
    const { container } = renderWithProvider(RENDER_SUBJECT({ placeholder: PLACEHOLDER, onShowPreview: undefined }));
    const buttons = container.querySelectorAll('.ds-button');

    expect(buttons.length).toBe(1);
  });

  test('Should render with showPreview button', () => {
    const onShowPreview = jest.fn();
    const { container } = renderWithProvider(RENDER_SUBJECT({ onShowPreview: onShowPreview }));
    const buttons = container.querySelectorAll('.ds-button');

    expect(buttons.length).toBe(2);
  });

  test('Should call showPreview callback', () => {
    const onShowPreview = jest.fn();
    const { container } = renderWithProvider(RENDER_SUBJECT({ onShowPreview: onShowPreview }));
    const buttons = container.querySelectorAll('.ds-button');

    fireEvent.click(buttons[1]);

    expect(onShowPreview).toBeCalled();
  });

  test('Should call showPreview callback', () => {
    const onShowPreview = jest.fn();
    const { container } = renderWithProvider(RENDER_SUBJECT({ onShowPreview: onShowPreview }));
    const buttons = container.querySelectorAll('.ds-button');

    fireEvent.click(buttons[1]);

    expect(onShowPreview).toBeCalled();
  });

  test('Should render with selected item', () => {
    const SELECTED_ITEM_NAME = 'Selected item';
    renderWithProvider(RENDER_SUBJECT({ selectedItem: { name: SELECTED_ITEM_NAME, id: 0, icon: <VarTypeStringM /> } }));

    expect(screen.getByText(SELECTED_ITEM_NAME)).toBeInTheDocument();
  });

  test('Should open dropdown with list of items and search', async () => {
    renderWithProvider(RENDER_SUBJECT(), {
      container: document.body,
    });
    userEvent.click(screen.getByTestId('subject-trigger'));

    await screen.findByPlaceholderText(SUBJECT_TEXTS.searchPlaceholder);
    expect(screen.getByText(SUBJECT_ITEMS[0].name)).toBeInTheDocument();
  });

  test('Should open dropdown with list of items and search by query and show "No results"', async () => {
    renderWithProvider(RENDER_SUBJECT(), {
      container: document.body,
    });
    userEvent.click(screen.getByTestId('subject-trigger'));

    fireEvent.change(await screen.findByPlaceholderText(SUBJECT_TEXTS.searchPlaceholder), {
      target: { value: 'xxxx' },
    });

    expect(screen.getByText(SUBJECT_TEXTS.noResults)).toBeInTheDocument();
  });

  test('Should open dropdown with list of items and shows list of searching results', async () => {
    renderWithProvider(RENDER_SUBJECT(), {
      container: document.body,
    });
    userEvent.click(screen.getByTestId('subject-trigger'));

    fireEvent.change(await screen.findByPlaceholderText(SUBJECT_TEXTS.searchPlaceholder), { target: { value: '#2' } });

    expect(screen.queryAllByRole('menuitem').length).toBe(11);
  });

  test('Should open dropdown with list, select item and update trigger button', async () => {
    renderWithProvider(RENDER_SUBJECT(), { container: document.body });

    userEvent.click(screen.getByTestId('subject-trigger'));

    await waitFor(() => expect(screen.getByTestId('subject-overlay')).toBeInTheDocument());

    userEvent.click(within(screen.getByTestId('subject-overlay')).getByText(SUBJECT_ITEMS[3].name));

    await waitFor(() => expect(screen.getByTestId('subject-overlay').closest('.ant-dropdown-hidden')).toBeTruthy());
  });

  test('should call onActivate', () => {
    const handleActivate = jest.fn();
    renderWithProvider(RENDER_SUBJECT({ onActivate: handleActivate }));

    userEvent.click(screen.getByText('Choose event'));

    expect(handleActivate).toBeCalled();
  });
  test('should call onDeactivate', async () => {
    const handleDeactivate = jest.fn();
    const handleActivate = jest.fn();
    const CLICK_OUTSIDE = 'CLICK_OUTSIDE';
    renderWithProvider(<>
      <div>{CLICK_OUTSIDE}</div>
      {RENDER_SUBJECT({ onDeactivate: handleDeactivate, onActivate: handleActivate })}
    </>);

    userEvent.click(screen.getByText('Choose event'));
    await waitFor(() => expect(handleActivate).toBeCalled());
    userEvent.click(screen.getByText(CLICK_OUTSIDE));
    
    await waitFor(() => expect(handleDeactivate).toBeCalled());
  });
});
