import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Block from "../index";
import Icon from "@synerise/ds-icon/dist/Icon";
import {EditM} from "@synerise/ds-icon/dist/icons";


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
