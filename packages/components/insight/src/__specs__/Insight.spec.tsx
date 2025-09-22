import React from 'react';
import { screen } from '@testing-library/react';

import Insight from '../Insight';
import { renderWithProvider } from '@synerise/ds-core';

describe('Section message component', () => {

  it('should render with title', () => {
    const title = "Title";
    renderWithProvider(<Insight title={title}/>);

    expect(screen.getByText(title)).toBeTruthy();
  });

  it('should render with subTitle', () => {
    const title = "Title";
    const subTitle = "description";
    renderWithProvider(<Insight title={title} subTitle={subTitle}/>);

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByText(subTitle)).toBeTruthy();
  });

  it('should render with content', () => {
    const title = "Title";
    const subTitle = "description";
    const TEST_ID = 'test';
    renderWithProvider(<Insight title={title} subTitle={subTitle} content={<div data-testid={TEST_ID}>Content</div>}/>);

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByText(subTitle)).toBeTruthy();
    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  it('should render with InlineAlert', () => {
    const title = "Title";
    const subTitle = "description";

    const alertMessages = [
      { message: 'New email campaign template version is ready to update', type: 'warning' },
      { message: 'Info message', type: 'info' },
    ];

    renderWithProvider(<Insight title={title} subTitle={subTitle} content={alertMessages}/>);

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByText(subTitle)).toBeTruthy();
    alertMessages.forEach(alert => {
      expect(screen.getByText(alert.message)).toBeInTheDocument();
    });
  });
})
