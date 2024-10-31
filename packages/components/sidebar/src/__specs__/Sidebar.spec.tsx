import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Sidebar from "../index";
import SidebarWithButton from '../../dist/SidebarWithButton/SidebarWithButton';
import { screen, fireEvent } from '@testing-library/react';

describe('Sidebar', () => {
  const HEADER_1 = 'header first';
  const HEADER_2 = 'header second';
  const HEADER_3 = 'header third';
  const ID_1 = 'first';
  const ID_2 = 'second';
  const ID_3 = 'third';
  const CHILDREN = 'Children';

  it('should render header', () => {
    const { getByText, container } = renderWithProvider(
      <Sidebar defaultActiveKey={['0']} order={[ID_2, ID_1,]}>
        <Sidebar.Panel header={HEADER_1} id={ID_1} key={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_2} id={ID_2}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    expect(screen.getByTestId(`header-${ID_1}`)).toBeInTheDocument();
  });

  it('should render active panel', () => {
    const { getByText } = renderWithProvider(
      <Sidebar defaultActiveKey={['0']} order={[ID_2, ID_1,]}>
        <Sidebar.Panel header={HEADER_1} id={ID_1} key={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_2} id={ID_2}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    expect(getByText(HEADER_1)).toBeTruthy();
  });
  it('should render text Button', () => {
    const { getByText } = renderWithProvider(
      <SidebarWithButton buttonLabel="Button" dataSource={null}/>
    );

    expect(getByText("Button")).toBeTruthy();
  });


  it('should fire open collapse', async () => {
    const { getByText } = renderWithProvider(
      <Sidebar defaultActiveKey={['0']} order={[ID_2, ID_1,]}>
        <Sidebar.Panel header={HEADER_1} id={ID_1} key={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_2} id={ID_2}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    fireEvent.click(getByText(HEADER_1));

    expect(getByText(CHILDREN)).toBeTruthy();
  });


  it('should render order in draggable mode', () => {
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

    fireEvent.click(getByText(HEADER_1));
    fireEvent.click(getByText(HEADER_2));
    fireEvent.click(getByText(HEADER_3));

    expect(container.querySelectorAll('.ant-collapse-header')[0].textContent).toEqual(HEADER_3);
    expect(container.querySelectorAll('.ant-collapse-header')[1].textContent).toEqual(HEADER_2);
    expect(container.querySelectorAll('.ant-collapse-header')[2].textContent).toEqual(HEADER_1);
    expect(container.querySelector('.ant-collapse.is-drag-drop')).toBeTruthy();
  });

  it('should change cursor to "move" in drag and drop mode', () => {

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

    const headerElement = container.querySelector(".ant-collapse-header");
    fireEvent.mouseOver(headerElement);

    expect(window.getComputedStyle(headerElement).getPropertyValue("cursor")).toBe("pointer");
  });
});
