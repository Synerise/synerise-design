import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

import Slider from '../index';

const LABEL = 'label';
const FIFTY = 50;
const MAX = 100;
const MIN = 0;
const tipFormatter = (value: number) => <div className="tooltip-content">{value}</div>;

describe('Slider', () => {
  it('should render with label', () => {
    // ARRANGE
    const { getByText, container } = renderWithProvider(
      <Slider label={LABEL} max={MAX} min={MIN} tipFormatter={tipFormatter} value={FIFTY} />
    );

    const sliderComponent = container.querySelector('.ant-slider');

    // ASSERT
    expect(getByText(LABEL)).toBeTruthy();
    expect(sliderComponent).toBeTruthy();
  });

  it('should have track proper values with min and max', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Slider max={MAX} min={MIN} tipFormatter={tipFormatter} value={FIFTY} />);

    const sliderComponent = container.querySelector('.ant-slider');
    const track = sliderComponent && sliderComponent.querySelector('.ant-slider-track');
    const trackStyles = track && window.getComputedStyle(track);
    const sliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle');

    // ASSERT
    expect(trackStyles && trackStyles.width).toBe('50%');
    expect(sliderHandle && sliderHandle.getAttribute('aria-valuenow')).toBe(`${FIFTY}`);
    expect(sliderHandle && sliderHandle.getAttribute('aria-valuemax')).toBe(`${MAX}`);
    expect(sliderHandle && sliderHandle.getAttribute('aria-valuemin')).toBe(`${MIN}`);
  });

  it('should show range values with 2 numbers', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Slider max={MAX} min={MIN} value={[40, 80]} range tipFormatter={tipFormatter} />
    );

    const sliderComponent = container.querySelector('.ant-slider');
    const track = sliderComponent && sliderComponent.querySelector('.ant-slider-track');
    const trackStyles = track && window.getComputedStyle(track);
    const leftSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-1');
    const rightSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-2');

    // ASSERT
    expect(trackStyles && trackStyles.width).toBe('40%');
    expect(trackStyles && trackStyles.left).toBe('40%');
    expect(leftSliderHandle && leftSliderHandle.getAttribute('aria-valuenow')).toBe(`40`);
    expect(rightSliderHandle && rightSliderHandle.getAttribute('aria-valuenow')).toBe(`80`);
  });

  it('should show range values with more than 2 numbers', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Slider max={MAX} min={MIN} value={[20, 40, 60, 80]} range tipFormatter={tipFormatter} />
    );

    const sliderComponent = container.querySelector('.ant-slider');
    const firstSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-1');
    const secondSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-2');
    const thirdSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-3');
    const fourthSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-4');

    // ASSERT
    expect(firstSliderHandle && firstSliderHandle.getAttribute('aria-valuenow')).toBe(`20`);
    expect(secondSliderHandle && secondSliderHandle.getAttribute('aria-valuenow')).toBe(`40`);
    expect(thirdSliderHandle && thirdSliderHandle.getAttribute('aria-valuenow')).toBe(`60`);
    expect(fourthSliderHandle && fourthSliderHandle.getAttribute('aria-valuenow')).toBe(`80`);
  });

  it('should show tooltip on hover', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Slider max={MAX} min={MIN} value={FIFTY} tipFormatter={tipFormatter} />);

    const sliderComponent = container.querySelector('.ant-slider');
    const sliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle');

    // ACT
    sliderHandle && fireEvent.mouseOver(sliderHandle);

    const body = document.querySelector('body');
    const tooltipContent = body && body.querySelector('.tooltip-content');

    // ASSERT
    expect(tooltipContent && tooltipContent.innerHTML).toBe(`${FIFTY}`);
  });

  it('should handle onChange event', () => {
    const onChange = jest.fn();
    // ARRANGE
    const { container } = renderWithProvider(
      <Slider
        max={MAX}
        min={MIN}
        autoFocus
        value={FIFTY}
        onChange={value => onChange(value)}
        tipFormatter={tipFormatter}
      />
    );

    const sliderComponent = container.querySelector('.ant-slider');
    const sliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle');

    // ACT
    sliderHandle && fireEvent.focus(sliderHandle);
    sliderHandle && fireEvent.keyDown(sliderHandle, { key: 'ArrowRight', code: 39 });

    // ASSERT
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
