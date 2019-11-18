import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Sidebar from "../index";
import {fireEvent} from "@testing-library/dom";

describe('Sidebar', () => {
  const HEADER = 'header test';
  const ID = 'id';
  const CHILDREN = 'Children';

  it('should render header', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Sidebar defaultActiveKey={['0']}>
        <Sidebar.Panel header={HEADER} id={ID}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    // ASSERT
    expect(getByText(HEADER)).toBeTruthy();
  });

  it('should render active panel', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Sidebar defaultActiveKey={['0']}>
        <Sidebar.Panel header={HEADER} id={ID}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    // ASSERT
    expect(getByText(HEADER)).toBeTruthy();
  });


  it('should fire open collapse', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Sidebar defaultActiveKey={['0']}>
        <Sidebar.Panel header={HEADER} id={ID}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    // ACT
    fireEvent.click(getByText(HEADER));

    // ASSERT
    expect(getByText(CHILDREN)).toBeTruthy();
  });


});
