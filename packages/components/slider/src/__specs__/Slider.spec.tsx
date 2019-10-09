import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

import Slider from '../index';

const LABEL = 'label';
const FIFTY = 50;
const MAX = 100;
const MIN = 0;
const tipFormatter = (value: number) => <div className="tooltip-content">{value}</div>;
const marks = {
  0: '0',
  3: '3',
  6: '6',
  9: '9',
};

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
    const track = sliderComponent.querySelector('.ant-slider-track');
    const trackStyles = window.getComputedStyle(track);
    const sliderHandle = sliderComponent.querySelector('.ant-slider-handle');

    // ASSERT
    expect(trackStyles.width).toBe('50%');
    expect(sliderHandle.getAttribute('aria-valuenow')).toBe(`${FIFTY}`);
    expect(sliderHandle.getAttribute('aria-valuemax')).toBe(`${MAX}`);
    expect(sliderHandle.getAttribute('aria-valuemin')).toBe(`${MIN}`);
  });

  it('should show range values with 2 numbers', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Slider max={MAX} min={MIN} value={[40, 80]} range tipFormatter={tipFormatter} />
    );

    const sliderComponent = container.querySelector('.ant-slider');
    const track = sliderComponent.querySelector('.ant-slider-track');
    const trackStyles = window.getComputedStyle(track);
    const leftSliderHandle = sliderComponent.querySelector('.ant-slider-handle-1');
    const rightSliderHandle = sliderComponent.querySelector('.ant-slider-handle-2');

    // ASSERT
    expect(trackStyles.width).toBe('40%');
    expect(trackStyles.left).toBe('40%');
    expect(leftSliderHandle.getAttribute('aria-valuenow')).toBe(`40`);
    expect(rightSliderHandle.getAttribute('aria-valuenow')).toBe(`80`);
  });

  it('should show range values with more than 2 numbers', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Slider max={MAX} min={MIN} value={[20, 40, 60, 80]} range tipFormatter={tipFormatter} />
    );

    const sliderComponent = container.querySelector('.ant-slider');
    const firstSliderHandle = sliderComponent.querySelector('.ant-slider-handle-1');
    const secondSliderHandle = sliderComponent.querySelector('.ant-slider-handle-2');
    const thirdSliderHandle = sliderComponent.querySelector('.ant-slider-handle-3');
    const fourthSliderHandle = sliderComponent.querySelector('.ant-slider-handle-4');

    // ASSERT
    expect(firstSliderHandle.getAttribute('aria-valuenow')).toBe(`20`);
    expect(secondSliderHandle.getAttribute('aria-valuenow')).toBe(`40`);
    expect(thirdSliderHandle.getAttribute('aria-valuenow')).toBe(`60`);
    expect(fourthSliderHandle.getAttribute('aria-valuenow')).toBe(`80`);
  });

  it('should show tooltip on hover', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Slider max={MAX} min={MIN} value={FIFTY} tipFormatter={tipFormatter} />);

    const sliderComponent = container.querySelector('.ant-slider');
    const sliderHandle = sliderComponent.querySelector('.ant-slider-handle');

    // ACT
    fireEvent.mouseOver(sliderHandle);

    const body = document.querySelector('body');
    const tooltipContent = body.querySelector('.tooltip-content');

    // ASSERT
    expect(tooltipContent.innerHTML).toBe(`${FIFTY}`);
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
    const sliderHandle = sliderComponent.querySelector('.ant-slider-handle');

    // ACT
    fireEvent.focus(sliderHandle);
    fireEvent.keyDown(sliderHandle, { key: 'ArrowRight', code: 39 });

    // ASSERT
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
