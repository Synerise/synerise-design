import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Block from "../index";
import Icon, { EditM } from "@synerise/ds-icon";


describe('Sidebar', () => {
  const TITLE = 'Title';

  it('should render title', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Block isDragging={false} icon={<Icon component={<EditM />} />}>
        {TITLE}
      </Block>
    );

    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
  });
});
