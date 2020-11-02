import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';

import Popconfirm from '../Popconfirm';

const TEXT = 'Click me';
const TITLE = 'Title';
const DESCRIPTION = 'Description';
const CANCEL = 'Cancel';
const OK = 'OK';
const IMAGES = ['https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_960_720.jpg', 'https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667_960_720.jpg', 'https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079_960_720.jpg'];

describe('Popconfirm', () => {
  it('should render', () => {
    // ARRANGE
    const { getAllByText } = renderWithProvider(
      <Popconfirm title={TITLE}>
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getAllByText(TEXT)[0]);

    //ASSERT
    expect(getAllByText(TEXT)[0]).toBeInTheDocument();
    expect(getAllByText(TITLE)[0]).toBeInTheDocument();
    expect(getAllByText(OK)[0]).toBeInTheDocument();
    expect(getAllByText(CANCEL)[0]).toBeInTheDocument();
  });

  it('should call onCancel when cancel clicked', () => {
    // ARRANGE
    const onCancel = jest.fn();
    const { getAllByText } = renderWithProvider(
      <Popconfirm title={TITLE} onCancel={onCancel}>
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getAllByText(TEXT)[0]);
    fireEvent.click(getAllByText(CANCEL)[0]);

    //ASSERT
    expect(onCancel).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onOk when OK clicked', () => {
    // ARRANGE
    const onConfirm = jest.fn();
    const { getAllByText } = renderWithProvider(
      <Popconfirm title={TITLE} okText={OK} onConfirm={onConfirm}>
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getAllByText(TEXT)[0]);
    fireEvent.click(getAllByText(OK)[0]);

    //ASSERT
    expect(onConfirm).toHaveBeenCalled();
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should have custom text on buttons', () => {
    // ARRANGE
    const { getAllByText, getByText } = renderWithProvider(
      <Popconfirm title={TITLE} okText="okText" cancelText="cancelText">
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getByText(TEXT));

    //ASSERT
    expect(getAllByText('okText')[0]).toBeInTheDocument();
    expect(getAllByText('cancelText')[0]).toBeInTheDocument();
  });

  it('should have provided placement', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Popconfirm title={TITLE} placement="bottomRight">
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getByText(TEXT));

    //ASSERT
    expect(document.querySelector('button')).toBeInTheDocument();
  });

  /*it('should trigger popconfirm on focus', () => {
    // ARRANGE
    const { getAllByText } = renderWithProvider(
      <Popconfirm title={TITLE} trigger="focus">
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.focus(getAllByText(TEXT)[0]);

    //ASSERT
    expect(getAllByText(OK)[0]).toBeInTheDocument();
    expect(getAllByText(CANCEL)[0]).toBeInTheDocument();
  });
*/
  it('should NOT show popconfirm when disabled', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Popconfirm title={TITLE} disabled>
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getByText(TEXT));

    //ASSERT
    expect(document.querySelectorAll('button').length).toBe(1);
  });

  it('should have proper title', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Popconfirm title={TITLE} okText="okText" cancelText="cancelText">
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getByText(TEXT));

    //ASSERT
    expect(getByText(TITLE)).toBeInTheDocument();
  });

  it('should have proper description', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Popconfirm title={TITLE} description={DESCRIPTION} okText="okText" cancelText="cancelText">
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getByText(TEXT));

    //ASSERT
    expect(getByText(DESCRIPTION)).toBeInTheDocument();
  });

  it('should have 3 slides in image carousel', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Popconfirm title={TITLE} images={IMAGES} description={DESCRIPTION} okText="okText" cancelText="cancelText">
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getByText(TEXT));

    //ASSERT
    expect(document.querySelectorAll('.slick-slide').length).toBe(3);
    expect(document.querySelectorAll('.slick-dots li').length).toBe(3);
  });
});
