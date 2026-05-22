import figma from '@figma/code-connect';
import { CheckboxSkeleton } from '@synerise/ds-skeleton';

import Checkbox from './Checkbox';

// The Checkbox component set (node 248:3956) has empty
// componentPropertyDefinitions, so `variant: { ... }` mapping is not usable.
// We connect each variant by its individual node ID instead.

const labelProps = {
  labelNested: figma.nestedProps('Label', {
    text: figma.string('Text'),
  }),
};

const descriptionProps = {
  labelNested: figma.nestedProps('Label', {
    text: figma.string('Text'),
  }),
  descriptionNested: figma.nestedProps('Description', {
    text: figma.string('Text'),
  }),
};

// =========================================================
// Content Type: Solo (no label, no description)
// =========================================================

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3952&m=dev',
  {
    example: () => <Checkbox />,
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3940&m=dev',
  {
    example: () => <Checkbox checked />,
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3954&m=dev',
  {
    example: () => <Checkbox indeterminate />,
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3953&m=dev',
  {
    example: () => <Checkbox disabled />,
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3938&m=dev',
  {
    example: () => <Checkbox checked disabled />,
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3939&m=dev',
  {
    example: () => <Checkbox hasError />,
  },
);

// =========================================================
// Content Type: Label (children for label text)
// =========================================================

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3942&m=dev',
  {
    props: labelProps,
    example: ({ labelNested }) => <Checkbox>{labelNested.text}</Checkbox>,
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3950&m=dev',
  {
    props: labelProps,
    example: ({ labelNested }) => (
      <Checkbox checked>{labelNested.text}</Checkbox>
    ),
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3941&m=dev',
  {
    props: labelProps,
    example: ({ labelNested }) => (
      <Checkbox indeterminate>{labelNested.text}</Checkbox>
    ),
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3948&m=dev',
  {
    props: labelProps,
    example: ({ labelNested }) => (
      <Checkbox disabled>{labelNested.text}</Checkbox>
    ),
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3951&m=dev',
  {
    props: labelProps,
    example: ({ labelNested }) => (
      <Checkbox checked disabled>
        {labelNested.text}
      </Checkbox>
    ),
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3944&m=dev',
  {
    props: labelProps,
    example: ({ labelNested }) => (
      <Checkbox errorText="Error">{labelNested.text}</Checkbox>
    ),
  },
);

// =========================================================
// Content Type: With Description (children + description prop)
// =========================================================

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3955&m=dev',
  {
    props: descriptionProps,
    example: ({ labelNested, descriptionNested }) => (
      <Checkbox description={descriptionNested.text}>
        {labelNested.text}
      </Checkbox>
    ),
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3945&m=dev',
  {
    props: descriptionProps,
    example: ({ labelNested, descriptionNested }) => (
      <Checkbox checked description={descriptionNested.text}>
        {labelNested.text}
      </Checkbox>
    ),
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3947&m=dev',
  {
    props: descriptionProps,
    example: ({ labelNested, descriptionNested }) => (
      <Checkbox indeterminate description={descriptionNested.text}>
        {labelNested.text}
      </Checkbox>
    ),
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3943&m=dev',
  {
    props: descriptionProps,
    example: ({ labelNested, descriptionNested }) => (
      <Checkbox disabled description={descriptionNested.text}>
        {labelNested.text}
      </Checkbox>
    ),
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3949&m=dev',
  {
    props: descriptionProps,
    example: ({ labelNested, descriptionNested }) => (
      <Checkbox checked disabled description={descriptionNested.text}>
        {labelNested.text}
      </Checkbox>
    ),
  },
);

figma.connect(
  Checkbox,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=248-3946&m=dev',
  {
    props: descriptionProps,
    example: ({ labelNested, descriptionNested }) => (
      <Checkbox errorText="Error" description={descriptionNested.text}>
        {labelNested.text}
      </Checkbox>
    ),
  },
);

// =========================================================
// State: Skeleton — maps to CheckboxSkeleton from @synerise/ds-skeleton
// =========================================================

figma.connect(
  CheckboxSkeleton,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=12288-18917&m=dev',
  {
    example: () => <CheckboxSkeleton numberOfSkeletons={0} />,
  },
);

figma.connect(
  CheckboxSkeleton,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=12288-18912&m=dev',
  {
    example: () => <CheckboxSkeleton numberOfSkeletons={1} />,
  },
);

figma.connect(
  CheckboxSkeleton,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=12288-18906&m=dev',
  {
    example: () => <CheckboxSkeleton numberOfSkeletons={2} />,
  },
);
