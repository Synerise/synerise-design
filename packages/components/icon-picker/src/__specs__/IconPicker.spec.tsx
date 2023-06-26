import * as React from 'react';
import {renderWithProvider} from "@synerise/ds-utils/dist/testing";
import { fireEvent } from "@testing-library/react";
import Button from "@synerise/ds-button";
import Icon, { Add3M } from "@synerise/ds-icon";
import IconPicker from "../IconPicker";

const data =
  [
    {
      category: 'emoji',
      items: [
        {item: '😀'}, {item: '😃'}, {item: '😄'}
      ],
    }
  ];

describe('Dropdown', () => {
  it('should render', () => {
    // ARRANGE
    const BUTTON_TEXT = 'button text';
    const { getByText } = renderWithProvider(
      <IconPicker
        button={<Button type="primary" mode='icon-label'><Icon component={<Add3M/>}/>{BUTTON_TEXT}</Button>}
        data={data}
        onSelect={()=>{}}
        trigger={["click"]}
        placeholder={"search"}
      />
    );

    // ACT
    fireEvent.click(getByText(BUTTON_TEXT));

    // ASSERT
    expect(getByText('😀')).toBeTruthy();
  });

  it('should select action', () => {
    // ARRANGE
    const onSelectAction = jest.fn();
    const BUTTON_TEXT = 'button text';
    const { getByText, getByTestId } = renderWithProvider(
      <IconPicker
        button={<Button type="primary" mode='icon-label'><Icon component={<Add3M/>}/>{BUTTON_TEXT}</Button>}
        data={data}
        onSelect={onSelectAction}
        trigger={["click"]}
        placeholder={"search"}
      />
    );

    // ACT
    fireEvent.click(getByText(BUTTON_TEXT));
    const emoji = getByTestId('icon0');
    fireEvent.mouseUp(emoji);

    // ASSERT
    expect(onSelectAction).toHaveBeenCalled();
  });
});
