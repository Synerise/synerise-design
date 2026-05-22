import figma from '@figma/code-connect';

import Radio from './Radio';

const labelProps = {
  labelText: figma.string('labelText'),
};

const descriptionProps = {
  labelText: figma.string('labelText'),
  descriptionNested: figma.nestedProps('Description', {
    text: figma.string('Text'),
  }),
};

// =========================================================
// Content Type: Solo (no label, no description)
// =========================================================

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10320&m=dev',
  {
    example: () => <Radio />,
  },
);

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10311&m=dev',
  {
    example: () => <Radio checked />,
  },
);

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10316&m=dev',
  {
    example: () => <Radio disabled />,
  },
);

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10310&m=dev',
  {
    example: () => <Radio checked disabled />,
  },
);

// =========================================================
// Content Type: Label
// =========================================================

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10321&m=dev',
  {
    props: labelProps,
    example: ({ labelText }) => <Radio label={labelText} />,
  },
);

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10314&m=dev',
  {
    props: labelProps,
    example: ({ labelText }) => <Radio checked label={labelText} />,
  },
);

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10318&m=dev',
  {
    props: labelProps,
    example: ({ labelText }) => <Radio disabled label={labelText} />,
  },
);

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10312&m=dev',
  {
    props: labelProps,
    example: ({ labelText }) => <Radio checked disabled label={labelText} />,
  },
);

// =========================================================
// Content Type: With Description
// =========================================================

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10322&m=dev',
  {
    props: descriptionProps,
    example: ({ labelText, descriptionNested }) => (
      <Radio label={labelText} description={descriptionNested.text} />
    ),
  },
);

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10315&m=dev',
  {
    props: descriptionProps,
    example: ({ labelText, descriptionNested }) => (
      <Radio checked label={labelText} description={descriptionNested.text} />
    ),
  },
);

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10319&m=dev',
  {
    props: descriptionProps,
    example: ({ labelText, descriptionNested }) => (
      <Radio disabled label={labelText} description={descriptionNested.text} />
    ),
  },
);

figma.connect(
  Radio,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=242-10313&m=dev',
  {
    props: descriptionProps,
    example: ({ labelText, descriptionNested }) => (
      <Radio
        checked
        disabled
        label={labelText}
        description={descriptionNested.text}
      />
    ),
  },
);
