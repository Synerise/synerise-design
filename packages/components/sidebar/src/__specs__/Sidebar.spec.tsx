import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Sidebar from "../index";
import {fireEvent} from "@testing-library/dom";

describe('Sidebar', () => {
  const HEADER_1 = 'header first';
  const HEADER_2 = 'header second';
  const HEADER_3 = 'header third';
  const ID_1 = 'first';
  const ID_2 = 'second';
  const ID_3 = 'third';
  const CHILDREN = 'Children';

  it('should render header', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Sidebar defaultActiveKey={['0']}>
        <Sidebar.Panel header={HEADER_1} id={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    // ASSERT
    expect(getByText(HEADER_1)).toBeTruthy();
  });

  it('should render active panel', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Sidebar defaultActiveKey={['0']}>
        <Sidebar.Panel header={HEADER_1} id={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    // ASSERT
    expect(getByText(HEADER_1)).toBeTruthy();
  });


  it('should fire open collapse', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Sidebar defaultActiveKey={['0']}>
        <Sidebar.Panel header={HEADER_1} id={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    // ACT
    fireEvent.click(getByText(HEADER_1));

    // ASSERT
    expect(getByText(CHILDREN)).toBeTruthy();
  });


  it('should render order', () => {
    // ARRANGE
    const { getByText, container } = renderWithProvider(
      <Sidebar order={[ ID_3, ID_2, ID_1,]}>
        <Sidebar.Panel header={HEADER_1} id={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_2} id={ID_2}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_3} id={ID_3}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    // ACT
    fireEvent.click(getByText(HEADER_1));
    fireEvent.click(getByText(HEADER_2));
    fireEvent.click(getByText(HEADER_3));

    // ASSERT
    expect(container.querySelectorAll('.ant-collapse-header')[0].textContent).toEqual(HEADER_3);
    expect(container.querySelectorAll('.ant-collapse-header')[1].textContent).toEqual(HEADER_2);
    expect(container.querySelectorAll('.ant-collapse-header')[2].textContent).toEqual(HEADER_1);
  });
});
