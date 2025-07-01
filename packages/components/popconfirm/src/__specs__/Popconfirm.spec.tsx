import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import Popconfirm from '../Popconfirm';

const TEXT = 'Click me';
const TITLE = 'Title';
const DESCRIPTION = 'Description';
const CANCEL = 'Cancel';
const OK = 'OK';
const IMAGES = [
  'https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_960_720.jpg',
  'https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667_960_720.jpg',
  'https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079_960_720.jpg',
];

describe('Popconfirm', () => {
  it('should render', () => {
    renderWithProvider(
      <Popconfirm title={TITLE}>
        <button>{TEXT}</button>
      </Popconfirm>,
    );

    fireEvent.click(screen.getAllByText(TEXT)[0]);

    expect(screen.getAllByText(TEXT)[0]).toBeInTheDocument();
    expect(screen.getAllByText(TITLE)[0]).toBeInTheDocument();
    expect(screen.getAllByText(OK)[0]).toBeInTheDocument();
    expect(screen.getAllByText(CANCEL)[0]).toBeInTheDocument();
  });

  it('should call onCancel when cancel clicked', () => {
    const onCancel = jest.fn();
    renderWithProvider(
      <Popconfirm title={TITLE} cancelText={CANCEL} onCancel={onCancel}>
        <button>{TEXT}</button>
      </Popconfirm>,
    );

    fireEvent.click(screen.getAllByText(TEXT)[0]);
    fireEvent.click(screen.getAllByText(CANCEL)[0]);

    expect(onCancel).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onOk when OK clicked', () => {
    const onConfirm = jest.fn();
    renderWithProvider(
      <Popconfirm title={TITLE} okText={OK} onConfirm={onConfirm}>
        <button>{TEXT}</button>
      </Popconfirm>,
    );

    fireEvent.click(screen.getAllByText(TEXT)[0]);
    fireEvent.click(screen.getAllByText(OK)[0]);

    expect(onConfirm).toHaveBeenCalled();
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should have provided placement', () => {
    renderWithProvider(
      <Popconfirm title={TITLE} placement="bottomRight">
        <button>{TEXT}</button>
      </Popconfirm>,
    );

    fireEvent.click(screen.getByText(TEXT));

    expect(document.querySelector('button')).toBeInTheDocument();
  });

  it('should trigger popconfirm on focus', async () => {
    renderWithProvider(
      <Popconfirm title={TITLE} trigger="focus">
        <button>{TEXT}</button>
      </Popconfirm>,
    );
    const trigger = screen.getByText(TEXT);
    expect(trigger).toBeInTheDocument();

    fireEvent.focus(trigger);

    await waitFor(
      () => {
        expect(screen.getByText(OK)).toBeInTheDocument();
        expect(screen.getByText(CANCEL)).toBeInTheDocument();
      },
      { timeout: 500 },
    );
  });

  it('should NOT show popconfirm when disabled', () => {
    renderWithProvider(
      <Popconfirm title={TITLE} disabled>
        <button>{TEXT}</button>
      </Popconfirm>,
    );

    fireEvent.click(screen.getByText(TEXT));

    expect(document.querySelectorAll('button').length).toBe(1);
  });

  it('should have proper title', () => {
    renderWithProvider(
      <Popconfirm title={TITLE} okText="okText" cancelText="cancelText">
        <button>{TEXT}</button>
      </Popconfirm>,
    );

    fireEvent.click(screen.getByText(TEXT));

    expect(screen.getByText(TITLE)).toBeInTheDocument();
  });

  it('should have proper description', () => {
    renderWithProvider(
      <Popconfirm
        title={TITLE}
        description={DESCRIPTION}
        okText="okText"
        cancelText="cancelText"
      >
        <button>{TEXT}</button>
      </Popconfirm>,
    );

    fireEvent.click(screen.getByText(TEXT));

    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });

  it('should have 3 slides in image carousel', () => {
    renderWithProvider(
      <Popconfirm
        title={TITLE}
        images={IMAGES}
        description={DESCRIPTION}
        okText="okText"
        cancelText="cancelText"
      >
        <button>{TEXT}</button>
      </Popconfirm>,
    );

    fireEvent.click(screen.getByText(TEXT));

    expect(document.querySelectorAll('.slick-slide').length).toBe(3);
    expect(document.querySelectorAll('.slick-dots li').length).toBe(3);
  });
});
