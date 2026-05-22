// @ts-nocheck
import figma from '@figma/code-connect';

import Result from './Result';

const RESULT_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=12346-40154&m=dev';

const sharedProps = {
  type: figma.enum('Type', {
    Default: 'info',
    Warning: 'warning',
    Error: 'error',
    Success: 'success',
    Progress: 'progress',
    NoResults: 'no-results',
  }),
  panel: figma.boolean('Show Panel', {
    true: <div>Panel content</div>,
    false: undefined,
  }),
  buttons: figma.boolean('Show Buttons', {
    true: <button type="button">Action</button>,
    false: undefined,
  }),
};

figma.connect(Result, RESULT_URL, {
  props: sharedProps,
  example: ({ type, panel, buttons }) => (
    <Result
      type={type}
      title="Result title"
      description="Result description"
      panel={panel}
      buttons={buttons}
    />
  ),
});
