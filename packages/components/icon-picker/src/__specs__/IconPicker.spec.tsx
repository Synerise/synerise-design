import React from 'react';
import { renderWithProvider } from "@synerise/ds-core";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import Button from "@synerise/ds-button";
import Icon, { Add3M } from "@synerise/ds-icon";

// The DS source lists whatever this module exports, so it is mocked down to a handful of icons
// to keep the list small and its order fixed — the tests below rely on AddM being first.
// Everything after the first three is only here because other packages rendered by this spec
// (ds-button's Checkbox, ds-dropdown, ds-scrollbar, …) import those icons from this same module;
// once tests resolve siblings from source rather than dist, dropping an export means they receive
// undefined. Regenerate by intersecting the named @synerise/ds-icon imports of icon-picker's
// transitive dependencies with the exports of icon/src/icons/M.
vi.mock('@synerise/ds-icon/dist/icons/M', () => {
  const Stub = (name: string) => {
    const Component = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid={`ds-icon-${name}`} {...props} />;
    Component.displayName = name;
    return Component;
  };
  const alsoRendered = [
    'Add3M', 'AngleDownS', 'AngleRightS', 'AngleUpS', 'ArrowDownCircleM', 'ArrowLeftM',
    'ArrowUpCircleM', 'CheckS', 'CheckboxDeafultM', 'CheckboxIndeterminateM', 'CheckboxM',
    'CheckboxSelectedFillM', 'Close3M', 'Close3S', 'CloseS', 'HideM', 'InfoFillS', 'InfoM',
    'ResizeArrowM', 'SearchNoResultsM', 'ShowM', 'SpinnerM', 'StarFillM', 'StarM',
  ];
  return {
    AddM: Stub('add-m'),
    EditM: Stub('edit-m'),
    SearchM: Stub('search-m'),
    ...Object.fromEntries(alsoRendered.map((name) => [name, Stub(name)])),
  };
});

import IconPicker from "../IconPicker";

const data =
  [
    {
      category: 'emoji',
      items: [
        { item: '😀' }, { item: '😃' }, { item: '😄' }
      ],
    }
  ];

describe('Dropdown', () => {
  it('should render', () => {
    const BUTTON_TEXT = 'button text';
    renderWithProvider(
      <IconPicker
        button={<Button type="primary" mode='icon-label'><Icon component={<Add3M />} />{BUTTON_TEXT}</Button>}
        data={data}
        onSelect={() => { }}
        trigger={["click"]}
        placeholder={"search"}
      />
    );

    fireEvent.click(screen.getByText(BUTTON_TEXT));

    expect(screen.getByText('😀')).toBeInTheDocument();
  });

  it('should select action', () => {
    const onSelectAction = vi.fn();
    const BUTTON_TEXT = 'button text';
    renderWithProvider(
      <IconPicker
        button={<Button type="primary" mode='icon-label'><Icon component={<Add3M />} />{BUTTON_TEXT}</Button>}
        data={data}
        onSelect={onSelectAction}
        trigger={["click"]}
        placeholder={"search"}
      />
    );

    fireEvent.click(screen.getByText(BUTTON_TEXT));
    const emoji = screen.getByTestId('icon-0');
    fireEvent.click(emoji);

    expect(onSelectAction).toHaveBeenCalledWith(
      '😀',
      expect.objectContaining({ category: 'emoji' }),
    );
  });

  it('should load DS icons as source', () => {
    const onSelectAction = vi.fn();
    const BUTTON_TEXT = 'button text';
    renderWithProvider(
      <IconPicker
        button={<Button type="primary" mode='icon-label'><Icon component={<Add3M />} />{BUTTON_TEXT}</Button>}
        data='design-system'
        onSelect={onSelectAction}
        trigger={["click"]}
        placeholder={"search"}
      />
    );

    fireEvent.click(screen.getByText(BUTTON_TEXT));

    expect(screen.getByTestId('ds-icon-add-m')).toBeInTheDocument();
  })

  it('should pass metadata for DS icons on select', () => {
    const onSelectAction = vi.fn();
    const BUTTON_TEXT = 'button text';
    renderWithProvider(
      <IconPicker
        button={<Button type="primary" mode='icon-label'><Icon component={<Add3M />} />{BUTTON_TEXT}</Button>}
        data='design-system'
        onSelect={onSelectAction}
        trigger={["click"]}
        placeholder={"search"}
      />
    );

    fireEvent.click(screen.getByText(BUTTON_TEXT));
    // One `icon-0` per virtualised row, so take the first row's first icon.
    fireEvent.click(screen.getAllByTestId('icon-0')[0]);

    expect(onSelectAction).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        name: 'AddM',
        keywords: 'AddM',
        category: 'DS Icons',
      }),
    );
  })

  it('should load FontAwesome icons as source', async () => {
    const onSelectAction = vi.fn();
    const BUTTON_TEXT = 'button text';
    renderWithProvider(
      <IconPicker
        button={<Button type="primary" mode='icon-label'><Icon component={<Add3M />} />{BUTTON_TEXT}</Button>}
        data='font-awesome'
        onSelect={onSelectAction}
        trigger={["click"]}
        placeholder={"search"}
      />
    );

    fireEvent.click(screen.getByText(BUTTON_TEXT));
    await waitFor(() => expect(screen.getByTestId('virtual-scrollbar').querySelectorAll('svg').length).toBeGreaterThan(0));
  })
});
