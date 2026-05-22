// @ts-nocheck
import figma from '@figma/code-connect';

import Navbar from './Navbar';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=323-6049&m=dev';

figma.connect(Navbar, FIGMA_URL, {
  example: () => (
    <Navbar logo={<></>} description="Module name" actions={<></>} />
  ),
});
