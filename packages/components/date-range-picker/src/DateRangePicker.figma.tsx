// @ts-nocheck
import figma from '@figma/code-connect';

import DateRangePicker from './DateRangePicker';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=12409-37818&m=dev';

figma.connect(DateRangePicker, FIGMA_URL, {
  variant: { 'Property 1': 'Drop default' },
  example: () => (
    <DateRangePicker
      value={{ type: 'ABSOLUTE' }}
      onApply={(value) => console.log(value)}
    />
  ),
});

figma.connect(DateRangePicker, FIGMA_URL, {
  variant: { 'Property 1': 'Drop Time' },
  example: () => (
    <DateRangePicker
      value={{ type: 'ABSOLUTE' }}
      onApply={(value) => console.log(value)}
      showTime
    />
  ),
});

figma.connect(DateRangePicker, FIGMA_URL, {
  variant: { 'Property 1': 'Drop Filter Everyday' },
  example: () => (
    <DateRangePicker
      value={{ type: 'ABSOLUTE' }}
      onApply={(value) => console.log(value)}
      showFilter
      allowedFilterTypes={['DAILY']}
    />
  ),
});

figma.connect(DateRangePicker, FIGMA_URL, {
  variant: { 'Property 1': 'Drop Filter Every week' },
  example: () => (
    <DateRangePicker
      value={{ type: 'ABSOLUTE' }}
      onApply={(value) => console.log(value)}
      showFilter
      allowedFilterTypes={['WEEKLY']}
    />
  ),
});

figma.connect(DateRangePicker, FIGMA_URL, {
  variant: { 'Property 1': 'Drop Filter Every month' },
  example: () => (
    <DateRangePicker
      value={{ type: 'ABSOLUTE' }}
      onApply={(value) => console.log(value)}
      showFilter
      allowedFilterTypes={['MONTHLY']}
    />
  ),
});
