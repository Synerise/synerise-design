// @ts-nocheck
import figma from '@figma/code-connect';

import Stepper from './Stepper';

const URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2657-1435&m=dev';

figma.connect(Stepper, URL, {
  variant: { 'Number of Steps': '2' },
  example: () => (
    <Stepper>
      <Stepper.Step stepNumber={1} label="Step 1" active />
      <Stepper.Step stepNumber={2} label="Step 2" />
    </Stepper>
  ),
});

figma.connect(Stepper, URL, {
  variant: { 'Number of Steps': '3' },
  example: () => (
    <Stepper>
      <Stepper.Step stepNumber={1} label="Step 1" done />
      <Stepper.Step stepNumber={2} label="Step 2" active />
      <Stepper.Step stepNumber={3} label="Step 3" />
    </Stepper>
  ),
});

figma.connect(Stepper, URL, {
  variant: { 'Number of Steps': '4' },
  example: () => (
    <Stepper>
      <Stepper.Step stepNumber={1} label="Step 1" done />
      <Stepper.Step stepNumber={2} label="Step 2" done />
      <Stepper.Step stepNumber={3} label="Step 3" active />
      <Stepper.Step stepNumber={4} label="Step 4" />
    </Stepper>
  ),
});

figma.connect(Stepper, URL, {
  variant: { 'Number of Steps': '5' },
  example: () => (
    <Stepper>
      <Stepper.Step stepNumber={1} label="Step 1" done />
      <Stepper.Step stepNumber={2} label="Step 2" done />
      <Stepper.Step stepNumber={3} label="Step 3" active />
      <Stepper.Step stepNumber={4} label="Step 4" />
      <Stepper.Step stepNumber={5} label="Step 5" />
    </Stepper>
  ),
});
