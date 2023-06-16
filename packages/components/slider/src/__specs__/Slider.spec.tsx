import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, waitFor, getByRole } from '@testing-library/react';

import Slider from '../index';
import { AllocationVariant } from '../Allocation/Allocation.types';

const LABEL = 'label';
const FIFTY = 50;
const MAX = 100;
const MIN = 0;
const tipFormatter = (value: number) => <div className="tooltip-content">{value}</div>;
const allocationVariants: AllocationVariant[] = [
  { name: 'Variant A', percentage: 33, tabId: 1, tabLetter: 'A' },
  { name: 'Variant B', percentage: 33, tabId: 2, tabLetter: 'B' },
  { name: 'Variant C', percentage: 34, tabId: 3, tabLetter: 'C' },
];
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

  it('should show tooltip on hover', async () => {
    // ARRANGE
    const { container, getByRole } = renderWithProvider(
      <Slider max={MAX} min={MIN} value={FIFTY} tipFormatter={tipFormatter} tooltipVisible />
    );

    const sliderComponent = container.querySelector('.ant-slider');
    const sliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle');

    // ACT
    sliderHandle && fireEvent.mouseOver(sliderHandle);

    // const tooltipContent = container.querySelector('.ant-tooltip-inner');
    const tooltip = await waitFor(() => getByRole('tooltip'));

    // ASSERT
    expect(tooltip).toHaveTextContent(`${FIFTY}`);
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
  it('should render allocation labels', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Slider
        type={'allocation'}
        allocationConfig={{
          variants: allocationVariants,
        }}
        tipFormatter={tipFormatter}
      />
    );
    // ASSERT
    allocationVariants.forEach(v => {
      expect(getByText(v.tabLetter as string)).toBeTruthy();
    });
  });
  it('should render (n-1) handles for (n) variants', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Slider
        type={'allocation'}
        allocationConfig={{
          variants: allocationVariants,
        }}
        tipFormatter={tipFormatter}
      />
    );
    // ASSERT
    expect(container.querySelectorAll('.ant-slider-handle').length).toBe(allocationVariants.length - 1);
  });
  it.todo('Slider defaults range colors to defaultColorsOrder');
  it.todo('Slider/Allocation defaults range colors to defaultColorsOrder');
  it.todo('Slider multivalue segments\'colors can be changed with colors map prop');
});
