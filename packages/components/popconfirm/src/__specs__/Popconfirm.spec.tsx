import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

import Popconfirm from '../Popconfirm';

const TEXT = 'Click me';
const TITLE = 'Title';
const CANCEL = 'Cancel';
const OK = 'OK';

describe('Popconfirm', () => {
  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Popconfirm title={TITLE}>
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getByText(TEXT));

    //ASSERT
    expect(getByText(TEXT)).toBeInTheDocument();
    expect(getByText(TITLE)).toBeInTheDocument();
    expect(getByText(OK)).toBeInTheDocument();
    expect(getByText(CANCEL)).toBeInTheDocument();
  });

  it('should call onCancel when cancel clicked', () => {
    // ARRANGE
    const onCancel = jest.fn();
    const { getByText } = renderWithProvider(
      <Popconfirm title={TITLE} onCancel={onCancel}>
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getByText(TEXT));
    fireEvent.click(getByText(CANCEL));

    //ASSERT
    expect(onCancel).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onOk when OK clicked', () => {
    // ARRANGE
    const onConfirm = jest.fn();
    const { getByText } = renderWithProvider(
      <Popconfirm title={TITLE} onConfirm={onConfirm}>
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getByText(TEXT));
    fireEvent.click(getByText(OK));

    //ASSERT
    expect(onConfirm).toHaveBeenCalled();
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should have custom text on buttons', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Popconfirm title={TITLE} okText="okText" cancelText="cancelText">
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.click(getByText(TEXT));

    //ASSERT
    expect(getByText('okText')).toBeInTheDocument();
    expect(getByText('cancelText')).toBeInTheDocument();
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
    expect(document.querySelector('.ant-popover-placement-bottomRight')).toBeInTheDocument();
  });

  it('should trigger popconfirm on focus', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Popconfirm title={TITLE} trigger="focus">
        <button>{TEXT}</button>
      </Popconfirm>
    );

    // ACT
    fireEvent.focus(getByText(TEXT));

    //ASSERT
    expect(getByText(OK)).toBeInTheDocument();
    expect(getByText(CANCEL)).toBeInTheDocument();
  });

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
});
