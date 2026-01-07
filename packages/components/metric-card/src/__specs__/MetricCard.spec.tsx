import React from 'react';
import { screen, fireEvent } from '@testing-library/react';


import MetricCard from '../MetricCard';
import { renderWithProvider } from '@synerise/ds-core';

describe('Section message component', () => {

  it('should render with title', () => {
    const title = "Title";
    renderWithProvider(<MetricCard title={title}/>);

    expect(screen.getByText(title)).toBeTruthy();
  });

  it('should render with displayValue and with hoverValue on hover', async () => {
    const title = "Title";
    const displayValue = 12345;
    const hoverValue = 123456;
    renderWithProvider(<MetricCard title={title} displayValue={displayValue} hoverValue={hoverValue}/>);

    const content = screen.getByTestId("ds-metric-card");

    const displayEl = screen.getByText(displayValue);
    const hoverEl = screen.getByText(hoverValue);

    expect(displayEl).toBeVisible();
    expect(hoverEl).not.toBeVisible();

    fireEvent.mouseEnter(content);

    expect(content).toHaveClass("hovered");
    expect(hoverEl).toBeVisible();
    expect(displayEl).not.toBeVisible();

    fireEvent.mouseLeave(content);

    expect(content).not.toHaveClass("hovered");
    expect(displayEl).toBeVisible();
    expect(hoverEl).not.toBeVisible();
  });

  it('should render with InlineAlert', () => {
    const title = "Title";
    const errorMessage = 'New email campaign template version is ready to update';

    renderWithProvider(<MetricCard title={title} errorMessage={errorMessage}/>);

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it('should render with copyIcon', () => {
    const title = "Title";
    const displayValue = 12345;
    const hoverValue = 123456;

    renderWithProvider(<MetricCard title={title} displayValue={displayValue} hoverValue={hoverValue} copyValue={String(hoverValue)}/>);

    const content = screen.getByTestId('ds-metric-card');

    expect(screen.queryByTestId('ds-copy-icon')).not.toBeInTheDocument();

    fireEvent.mouseEnter(content);


    expect(screen.getByTestId('ds-copy-icon')).toBeInTheDocument();
  });


})
