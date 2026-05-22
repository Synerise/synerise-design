// @ts-nocheck
import figma from '@figma/code-connect';

import Slider from './Slider';

const DEFAULT_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=1845-24350&m=dev';

const ALLOCATION_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=1847-24585&m=dev';

figma.connect(Slider, DEFAULT_URL, {
  variant: { Type: 'Default' },
  props: {
    label: figma.boolean('Show Header#1845:32', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show Description#1845:25', {
      true: 'Description',
      false: undefined,
    }),
    thick: figma.enum('Bar Thickness', {
      '6px': true,
      '3px': false,
    }),
  },
  example: ({ label, description, thick }) => (
    <Slider
      label={label}
      description={description}
      thick={thick}
      min={0}
      max={100}
      value={50}
      onChange={() => {}}
    />
  ),
});

figma.connect(Slider, DEFAULT_URL, {
  variant: { Type: 'Range' },
  props: {
    label: figma.boolean('Show Header#1845:32', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show Description#1845:25', {
      true: 'Description',
      false: undefined,
    }),
    thick: figma.enum('Bar Thickness', {
      '6px': true,
      '3px': false,
    }),
  },
  example: ({ label, description, thick }) => (
    <Slider
      range
      label={label}
      description={description}
      thick={thick}
      min={0}
      max={100}
      value={[25, 75]}
      onChange={() => {}}
    />
  ),
});

figma.connect(Slider, ALLOCATION_URL, {
  variant: { Variants: '1' },
  props: {
    label: figma.boolean('Show Header#1847:0', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show description#1847:18', {
      true: 'Description',
      false: undefined,
    }),
    thick: figma.enum('Bar thickness', {
      '6px': true,
      '3px': false,
    }),
  },
  example: ({ label, description, thick }) => (
    <Slider
      type="allocation"
      label={label}
      description={description}
      thick={thick}
      allocationConfig={{
        variants: [{ name: 'A', percentage: 100, tabId: 1, tabLetter: 'A' }],
        onAllocationChange: () => {},
      }}
    />
  ),
});

figma.connect(Slider, ALLOCATION_URL, {
  variant: { Variants: '2' },
  props: {
    label: figma.boolean('Show Header#1847:0', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show description#1847:18', {
      true: 'Description',
      false: undefined,
    }),
    thick: figma.enum('Bar thickness', {
      '6px': true,
      '3px': false,
    }),
  },
  example: ({ label, description, thick }) => (
    <Slider
      type="allocation"
      label={label}
      description={description}
      thick={thick}
      allocationConfig={{
        variants: [
          { name: 'A', percentage: 50, tabId: 1, tabLetter: 'A' },
          { name: 'B', percentage: 50, tabId: 2, tabLetter: 'B' },
        ],
        onAllocationChange: () => {},
      }}
    />
  ),
});

figma.connect(Slider, ALLOCATION_URL, {
  variant: { Variants: '3' },
  props: {
    label: figma.boolean('Show Header#1847:0', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show description#1847:18', {
      true: 'Description',
      false: undefined,
    }),
    thick: figma.enum('Bar thickness', {
      '6px': true,
      '3px': false,
    }),
  },
  example: ({ label, description, thick }) => (
    <Slider
      type="allocation"
      label={label}
      description={description}
      thick={thick}
      allocationConfig={{
        variants: [
          { name: 'A', percentage: 34, tabId: 1, tabLetter: 'A' },
          { name: 'B', percentage: 33, tabId: 2, tabLetter: 'B' },
          { name: 'C', percentage: 33, tabId: 3, tabLetter: 'C' },
        ],
        onAllocationChange: () => {},
      }}
    />
  ),
});

figma.connect(Slider, ALLOCATION_URL, {
  variant: { Variants: '4' },
  props: {
    label: figma.boolean('Show Header#1847:0', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show description#1847:18', {
      true: 'Description',
      false: undefined,
    }),
    thick: figma.enum('Bar thickness', {
      '6px': true,
      '3px': false,
    }),
  },
  example: ({ label, description, thick }) => (
    <Slider
      type="allocation"
      label={label}
      description={description}
      thick={thick}
      allocationConfig={{
        variants: [
          { name: 'A', percentage: 25, tabId: 1, tabLetter: 'A' },
          { name: 'B', percentage: 25, tabId: 2, tabLetter: 'B' },
          { name: 'C', percentage: 25, tabId: 3, tabLetter: 'C' },
          { name: 'D', percentage: 25, tabId: 4, tabLetter: 'D' },
        ],
        onAllocationChange: () => {},
      }}
    />
  ),
});

figma.connect(Slider, ALLOCATION_URL, {
  variant: { Variants: '5' },
  props: {
    label: figma.boolean('Show Header#1847:0', {
      true: 'Label',
      false: undefined,
    }),
    description: figma.boolean('Show description#1847:18', {
      true: 'Description',
      false: undefined,
    }),
    thick: figma.enum('Bar thickness', {
      '6px': true,
      '3px': false,
    }),
  },
  example: ({ label, description, thick }) => (
    <Slider
      type="allocation"
      label={label}
      description={description}
      thick={thick}
      allocationConfig={{
        variants: [
          { name: 'A', percentage: 20, tabId: 1, tabLetter: 'A' },
          { name: 'B', percentage: 20, tabId: 2, tabLetter: 'B' },
          { name: 'C', percentage: 20, tabId: 3, tabLetter: 'C' },
          { name: 'D', percentage: 20, tabId: 4, tabLetter: 'D' },
          { name: 'E', percentage: 20, tabId: 5, tabLetter: 'E' },
        ],
        onAllocationChange: () => {},
      }}
    />
  ),
});
