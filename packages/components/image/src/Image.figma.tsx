import figma from '@figma/code-connect';

import Thumbnail from './Thumbnail/Thumbnail';

const FIGMA_URL_IMAGE =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=20563-10777&m=dev';

figma.connect(Thumbnail, FIGMA_URL_IMAGE, {
  example: () => (
    <Thumbnail
      src="https://example.com/photo.jpg"
      alt="Example photo"
      aspectRatio="1:1"
      size="m"
      objectFit="cover"
    />
  ),
});
