import figma from '@figma/code-connect';

import DatePicker from './DatePicker';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2012-35636&m=dev';

figma.connect(DatePicker, FIGMA_URL, {
  variant: { State: 'Default' },
  example: () => <DatePicker onApply={() => {}} />,
});

figma.connect(DatePicker, FIGMA_URL, {
  variant: { State: 'Selected' },
  example: () => <DatePicker value={new Date()} onApply={() => {}} />,
});

figma.connect(DatePicker, FIGMA_URL, {
  variant: { State: 'Months' },
  example: () => <DatePicker onApply={() => {}} />,
});

figma.connect(DatePicker, FIGMA_URL, {
  variant: { State: 'Year' },
  example: () => <DatePicker onApply={() => {}} />,
});

figma.connect(DatePicker, FIGMA_URL, {
  variant: { State: 'Years range' },
  example: () => <DatePicker onApply={() => {}} />,
});

figma.connect(DatePicker, FIGMA_URL, {
  variant: { State: 'Time picker 12h' },
  example: () => <DatePicker showTime onApply={() => {}} />,
});

figma.connect(DatePicker, FIGMA_URL, {
  variant: { State: 'Time Picker 24h' },
  example: () => <DatePicker showTime onApply={() => {}} />,
});

figma.connect(DatePicker, FIGMA_URL, {
  variant: { State: 'Quick Pick' },
  example: () => (
    <DatePicker
      onApply={() => {}}
      quickPicks={[
        { label: 'Today', value: new Date() },
        { label: 'Yesterday', value: new Date() },
      ]}
    />
  ),
});
