// @ts-nocheck
import figma from '@figma/code-connect';

import Wizard from './Wizard';

const WIZARD_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=12983-20272&m=dev';

figma.connect(Wizard, WIZARD_URL, {
  example: () => (
    <Wizard
      visible
      title="Wizard Header"
      onClose={() => {}}
      onPrevStep={() => {}}
      onNextStep={() => {}}
      navigationInFooter
      footerLeft={<div>Footer left</div>}
      footerAction={<div>Footer action</div>}
    >
      <div>Wizard content</div>
    </Wizard>
  ),
});
