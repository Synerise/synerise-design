import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { type AllocationVariant } from './Slider.types';
import Slider from './index';

const LABEL = 'label';
const DESCRIPTION = 'DESCRIPTION';
const FIFTY = 50;
const MAX = 100;
const MIN = 0;
const RANGE_VALUE = [FIFTY, 70]
const MARKS_MAX = '100%';
const MARKS_MIN = '0%';

const MARKS = {
  [MIN]: MARKS_MIN,
  [MAX]: MARKS_MAX
}
const tipFormatter = (value?: number) => (
  <div data-testid='slider-handle-value'>{value}</div>
);

describe('RangeSlider', () => {
  const RANGE_PROPS = {
    range: true as const,
    label: LABEL,
    description: DESCRIPTION,
    max: MAX,
    min: MIN,
    value: RANGE_VALUE
  }
  it('should render with label and description', () => {
    renderWithProvider(
      <Slider
        {...RANGE_PROPS}
        tipFormatter={tipFormatter}
      />,
    );

    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
    expect(screen.getAllByRole('slider')).toHaveLength(2)
  });

  it('should render without label and description', () => {
    renderWithProvider(
      <Slider
        {...RANGE_PROPS}
        tipFormatter={tipFormatter}
        label={undefined} description={undefined} />,
    );

    expect(screen.queryByText(DESCRIPTION)).not.toBeInTheDocument();
    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
    expect(screen.getAllByRole('slider')).toHaveLength(2)
  });


  it('should render min and max in the scale', () => {
    renderWithProvider(
      <Slider {...RANGE_PROPS} marks={MARKS} tipFormatter={tipFormatter} />,
    );

    expect(screen.getByTestId('ds-slider-marks')).toBeInTheDocument();
    RANGE_VALUE.forEach((handleValue: number) => {
      const handles = screen.getAllByTestId('ds-slider-handle');
      const handle = handles.find(h => h.getAttribute('aria-valuenow') === `${handleValue}`);
      expect(handle).toBeInTheDocument();
    
      expect(handle).toHaveAttribute('aria-valuemin', `${MIN}`)
      expect(handle).toHaveAttribute('aria-valuemax', `${MAX}`)
    })
    
    expect(screen.getByText(FIFTY)).toBeInTheDocument()
    expect(screen.getByText(MARKS_MIN)).toBeInTheDocument()
    expect(screen.getByText(MARKS_MAX)).toBeInTheDocument()
    
  });

  

  it('should render multiple values', () => {
    const MULTI_VALUE = [10,20,50,80]
    renderWithProvider(
      <Slider {...RANGE_PROPS} value={MULTI_VALUE} marks={MARKS} tipFormatter={tipFormatter} />,
    );

    expect(screen.getByTestId('ds-slider-marks')).toBeInTheDocument();
    MULTI_VALUE.forEach((handleValue: number) => {
      const handles = screen.getAllByTestId('ds-slider-handle');
      const handle = handles.find(h => h.getAttribute('aria-valuenow') === `${handleValue}`);
      expect(handle).toBeInTheDocument();
    
      expect(handle).toHaveAttribute('aria-valuemin', `${MIN}`)
      expect(handle).toHaveAttribute('aria-valuemax', `${MAX}`)
    })
    expect(screen.getAllByTestId('ds-slider-section')).toHaveLength(MULTI_VALUE.length - 1);
    
    expect(screen.getByText(MARKS_MIN)).toBeInTheDocument()
    expect(screen.getByText(MARKS_MAX)).toBeInTheDocument()
    
  });


  it('should render custom formatter', async () => {
    renderWithProvider(
      <Slider {...RANGE_PROPS} tipFormatter={tipFormatter} />,
    );

    expect(screen.getAllByTestId('slider-handle-value')).toHaveLength(2)
  })



  it('should render no handle value', async () => {
    renderWithProvider(
      <Slider {...RANGE_PROPS} tipFormatter={false} />,
    );

    expect(screen.queryByTestId('slider-handle-value')).not.toBeInTheDocument()
  })

  it('should trigger onChange event', async () => {
    const onChange = vi.fn();
    const onAfterChange = vi.fn();
    renderWithProvider(
      <Slider {...RANGE_PROPS} onChange={onChange} onAfterChange={onAfterChange} />,
    );

    const bar = screen.getByTestId('ds-slider-bar')
    await userEvent.click(bar)

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onAfterChange).toHaveBeenCalledTimes(1));
  });
  
})

describe('Default Slider', () => {
  const PROPS = {
    label: LABEL,
    description: DESCRIPTION,
    max: MAX,
    min: MIN,
    value: FIFTY
  }
  it('should render with label and description', () => {
    renderWithProvider(
      <Slider {...PROPS} />,
    );

    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
  it('should render without label and description', () => {
    renderWithProvider(
      <Slider {...PROPS} label={undefined} description={undefined} />,
    );

    expect(screen.queryByText(DESCRIPTION)).not.toBeInTheDocument();
    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('should render min and max in the scale', () => {
    renderWithProvider(
      <Slider {...PROPS} marks={MARKS} />,
    );

    expect(screen.getByTestId('ds-slider-marks')).toBeInTheDocument();
    expect(screen.getByTestId('ds-slider-handle')).toBeInTheDocument();
    expect(screen.getByTestId('ds-slider-handle')).toHaveAttribute('aria-valuenow', `${FIFTY}`)
    expect(screen.getByTestId('ds-slider-handle')).toHaveAttribute('aria-valuemin', `${MIN}`)
    expect(screen.getByTestId('ds-slider-handle')).toHaveAttribute('aria-valuemax', `${MAX}`)
    
    expect(screen.getByText(FIFTY)).toBeInTheDocument()
    expect(screen.getByText(MARKS_MIN)).toBeInTheDocument()
    expect(screen.getByText(MARKS_MAX)).toBeInTheDocument()
    
  });


  it('should render custom formatter', async () => {
    renderWithProvider(
      <Slider {...PROPS} tipFormatter={tipFormatter} />,
    );

    expect(screen.getByTestId('slider-handle-value')).toBeInTheDocument();
  })

  it('should render no handle value', async () => {
    renderWithProvider(
      <Slider {...PROPS} tipFormatter={false} />,
    );

    expect(screen.queryByTestId('slider-handle-value')).not.toBeInTheDocument()
  })

  it('should trigger onChange event', async () => {
    const onChange = vi.fn();
    const onAfterChange = vi.fn();
    renderWithProvider(
      <Slider {...PROPS} onChange={onChange} onAfterChange={onAfterChange} />,
    );

    const bar = screen.getByTestId('ds-slider-bar')
    await userEvent.click(bar)

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onAfterChange).toHaveBeenCalledTimes(1));
  });
})

describe('Allocation Slider', () => {
  const allocationVariants: AllocationVariant[] = [
    { name: 'Variant A', percentage: 33, tabId: 1, tabLetter: 'A' },
    { name: 'Variant B', percentage: 30, tabId: 2, tabLetter: 'B' },
    { name: 'Variant C', percentage: 37, tabId: 3, tabLetter: 'C' },
  ];
  const onAllocationChange = vi.fn()
  const ALLOCATION_CONFIG = {
    variants: allocationVariants,
    onAllocationChange,
  }
  const ALLOCATION_PROPS = {
    label: LABEL,
    description: DESCRIPTION,
    type: 'allocation' as const,
    allocationConfig: ALLOCATION_CONFIG
  }
  it('should render with label and description', () => {
    renderWithProvider(
      <Slider {...ALLOCATION_PROPS} />,
    );

    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });
  
  it('should render without label and description', () => {
    renderWithProvider(
      <Slider {...ALLOCATION_PROPS} label={undefined} description={undefined} />,
    );

    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
    expect(screen.queryByText(DESCRIPTION)).not.toBeInTheDocument();
  });

  it('should render allocation labels', () => {
    renderWithProvider(
      <Slider {...ALLOCATION_PROPS} />,
    );
    allocationVariants.forEach((v) => {
      expect(screen.getByText(v.tabLetter as string)).toBeInTheDocument();
    });
    
    
  });
  
  it('should render (n-1) handles for (n) variants', () => {
    renderWithProvider(
      <Slider {...ALLOCATION_PROPS} />,
    );
    
    expect(screen.getAllByRole('slider')).toHaveLength(ALLOCATION_CONFIG.variants.length-1)
  });
  
});
