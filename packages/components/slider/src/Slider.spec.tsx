import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import { defaultColorsOrder, theme } from '@synerise/ds-core';
import Slider from './index';
import { AllocationVariant } from './Allocation/Allocation.types';

const LABEL = 'label';
const FIFTY = 50;
const MAX = 100;
const MIN = 0;
const tipFormatter = (value?: number) => <div className="tooltip-content">{value}</div>;
const allocationVariants: AllocationVariant[] = [
  { name: 'Variant A', percentage: 33, tabId: 1, tabLetter: 'A' },
  { name: 'Variant B', percentage: 33, tabId: 2, tabLetter: 'B' },
  { name: 'Variant C', percentage: 34, tabId: 3, tabLetter: 'C' },
];
describe('Slider', () => {
  it('should render with label', () => {
    const { container } = renderWithProvider(
      <Slider label={LABEL} max={MAX} min={MIN} tipFormatter={tipFormatter} value={FIFTY} />
    );

    const sliderComponent = container.querySelector('.ant-slider');

    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(sliderComponent).toBeInTheDocument();
  });

  it('should have track proper values with min and max', () => {
    const { container } = renderWithProvider(<Slider max={MAX} min={MIN} tipFormatter={tipFormatter} value={FIFTY} />);

    const sliderComponent = container.querySelector('.ant-slider');
    const track = sliderComponent && sliderComponent.querySelector('.ant-slider-track');
    const trackStyles = track && window.getComputedStyle(track);
    const sliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle');

    expect(trackStyles && trackStyles.width).toBe('50%');
    expect(sliderHandle && sliderHandle.getAttribute('aria-valuenow')).toBe(`${FIFTY}`);
    expect(sliderHandle && sliderHandle.getAttribute('aria-valuemax')).toBe(`${MAX}`);
    expect(sliderHandle && sliderHandle.getAttribute('aria-valuemin')).toBe(`${MIN}`);
  });

  it('should show range values with 2 numbers', () => {
    const { container } = renderWithProvider(
      <Slider max={MAX} min={MIN} value={[40, 80]} range tipFormatter={tipFormatter} />
    );

    const sliderComponent = container.querySelector('.ant-slider');
    const track = sliderComponent && sliderComponent.querySelector('.ant-slider-track');
    const trackStyles = track && window.getComputedStyle(track);
    const leftSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-1');
    const rightSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-2');

    expect(trackStyles && trackStyles.width).toBe('40%');
    expect(trackStyles && trackStyles.left).toBe('40%');
    expect(leftSliderHandle && leftSliderHandle.getAttribute('aria-valuenow')).toBe(`40`);
    expect(rightSliderHandle && rightSliderHandle.getAttribute('aria-valuenow')).toBe(`80`);
  });

  it('should show range values with more than 2 numbers', () => {
    const { container } = renderWithProvider(
      <Slider max={MAX} min={MIN} value={[20, 40, 60, 80]} range tipFormatter={tipFormatter} />
    );

    const sliderComponent = container.querySelector('.ant-slider');
    const firstSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-1');
    const secondSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-2');
    const thirdSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-3');
    const fourthSliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle-4');

    expect(firstSliderHandle && firstSliderHandle.getAttribute('aria-valuenow')).toBe(`20`);
    expect(secondSliderHandle && secondSliderHandle.getAttribute('aria-valuenow')).toBe(`40`);
    expect(thirdSliderHandle && thirdSliderHandle.getAttribute('aria-valuenow')).toBe(`60`);
    expect(fourthSliderHandle && fourthSliderHandle.getAttribute('aria-valuenow')).toBe(`80`);
  });

  it('should show tooltip on hover', async () => {
    const { container } = renderWithProvider(
      <Slider max={MAX} min={MIN} value={FIFTY} tipFormatter={tipFormatter} tooltipVisible />
    );

    const sliderComponent = container.querySelector('.ant-slider');
    const sliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle');

    sliderHandle && fireEvent.mouseOver(sliderHandle);

    // const tooltipContent = container.querySelector('.ant-tooltip-inner');
    const tooltip = await waitFor(() => screen.getByRole('tooltip'));

    expect(tooltip).toHaveTextContent(`${FIFTY}`);
  });

  it.only('should handle onChange event', async () => {
    const onChange = jest.fn();
    const { container } = renderWithProvider(
      <Slider
        max={MAX}
        min={MIN}
        autoFocus
        value={FIFTY}
        onChange={onChange}
        tipFormatter={tipFormatter}
      />
    );

    const sliderComponent = container.querySelector('.ant-slider');
    const sliderHandle = sliderComponent && sliderComponent.querySelector('.ant-slider-handle');
    
    expect(sliderHandle).toBeInTheDocument()

    if (sliderHandle) {
      fireEvent.mouseOver(sliderHandle)
      fireEvent.mouseDown(sliderHandle)
      fireEvent.mouseMove(sliderHandle, { clientX: 100 })
      fireEvent.mouseUp(sliderHandle)
    }

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  });
  it('should render allocation labels', () => {
    renderWithProvider(
      <Slider
        type={'allocation'}
        allocationConfig={{
          variants: allocationVariants,
        }}
        tipFormatter={tipFormatter}
      />
    );
    allocationVariants.forEach(v => {
      expect(screen.getByText(v.tabLetter as string)).toBeInTheDocument();
    });
  });
  it('should render (n-1) handles for (n) variants', () => {
    const { container } = renderWithProvider(
      <Slider
        type={'allocation'}
        allocationConfig={{
          variants: allocationVariants,
        }}
        tipFormatter={tipFormatter}
      />
    );
    expect(container.querySelectorAll('.ant-slider-handle').length).toBe(allocationVariants.length - 1);
  });
  it('Slider defaults range colors to defaultColorsOrder', () => {
    const { container } = renderWithProvider(
      <Slider max={MAX} min={MIN} value={[20, 40, 60, 80]} useColorPalette range tipFormatter={tipFormatter} />
    );
    
    const sliderComponent = container.querySelector('.ant-slider');
    const tracks = sliderComponent && sliderComponent.querySelectorAll('.ant-slider-track');
    tracks?.forEach((track, index: number) => {
      const trackColorToken = defaultColorsOrder[index];
      expect(track).toHaveStyle(`background-color: ${theme.palette[trackColorToken]}`);
    })

  });
  it('Slider/Allocation defaults range colors to defaultColorsOrder', () => {
    const { container } = renderWithProvider(
      <Slider
        type={'allocation'}
        allocationConfig={{
          variants: allocationVariants,
        }}
        useColorPalette
      />
    );
    
    const sliderComponent = container.querySelector('.ant-slider');
    const tracks = sliderComponent && sliderComponent.querySelectorAll('.ant-slider-segment');
    tracks?.forEach((track, index: number) => {
      const trackColorToken = defaultColorsOrder[index];
      expect(track).toHaveStyle(`background-color: ${theme.palette[trackColorToken]}`);
    })
  });
  it('Slider multivalue segments\'colors can be changed with colors map prop', () => {
    const tracksColorMap = {"0":"cyan-600","1":"yellow-600","2":"pink-600","3":"green-600","4":"mars-600","5":"orange-600","6":"purple-600","7":"violet-600","8":"red-600","9":"fern-600"}
    const { container } = renderWithProvider(
      <Slider
        type={'allocation'}
        allocationConfig={{
          variants: allocationVariants,
        }}
        useColorPalette
        tracksColorMap={tracksColorMap}
      />
    );
    
    const sliderComponent = container.querySelector('.ant-slider');
    const tracks = sliderComponent && sliderComponent.querySelectorAll('.ant-slider-segment');
    tracks?.forEach((track, index: number) => {
      const trackColorToken = tracksColorMap[index];
      expect(track).toHaveStyle(`background-color: ${theme.palette[trackColorToken]}`);
    })
  });

  it('should display the min and max values', () => {
    const minVal = 17;
    const maxVal = 93;

    const mark = {
      [minVal]: minVal,
      [maxVal]: maxVal,
    };

    renderWithProvider(<Slider label={LABEL} max={maxVal} min={minVal} value={FIFTY} marks={mark} />);

    expect(screen.getByText(minVal.toString())).toBeInTheDocument();
    expect(screen.getByText(maxVal.toString())).toBeInTheDocument();
  });
});
