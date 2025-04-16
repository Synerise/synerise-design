import React from 'react';
import { renderWithProvider } from "@synerise/ds-utils/dist/testing";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import Button from "@synerise/ds-button";
import Icon, { Add3M } from "@synerise/ds-icon";

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
    const onSelectAction = jest.fn();
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

    expect(onSelectAction).toHaveBeenCalled();
  });

  it('should load DS icons as source', () => {
    const onSelectAction = jest.fn();
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

  it('should load FontAwesome icons as source', async () => {
    const onSelectAction = jest.fn();
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
