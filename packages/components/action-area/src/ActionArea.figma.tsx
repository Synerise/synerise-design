import figma from '@figma/code-connect';

import ActionArea from './ActionArea';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=1302:19040&m=dev';

const baseProps = {
  label: figma.boolean('Show Header', {
    true: figma.string('✏️Header Text'),
    false: undefined,
  }),
  description: figma.boolean('Show description', {
    true: figma.string('✏️Description Text'),
    false: undefined,
  }),
};

figma.connect(ActionArea, FIGMA_URL, {
  variant: { State: 'Default' },
  props: baseProps,
  example: ({ label, description }) => (
    <ActionArea
      label={label}
      description={description}
      action={() => {}}
      actionLabel="Select template"
    />
  ),
});

figma.connect(ActionArea, FIGMA_URL, {
  variant: { State: 'Disabled' },
  props: baseProps,
  example: ({ label, description }) => (
    <ActionArea
      label={label}
      description={description}
      action={() => {}}
      actionLabel="Select template"
      buttonProps={{ disabled: true }}
    />
  ),
});

figma.connect(ActionArea, FIGMA_URL, {
  variant: { State: 'Error' },
  props: baseProps,
  example: ({ label, description }) => (
    <ActionArea
      label={label}
      description={description}
      action={() => {}}
      actionLabel="Select template"
      isError
      errorText="Error message"
    />
  ),
});
