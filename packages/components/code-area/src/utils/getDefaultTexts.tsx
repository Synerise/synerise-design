import React from 'react';
import { FormattedMessage } from 'react-intl';

import { type CodeAreaTexts } from '../CodeArea.types';

export const getDefaultTexts = (
  texts?: Partial<CodeAreaTexts>,
): CodeAreaTexts => {
  const defaultTexts = {
    fullscreen: (
      <FormattedMessage
        id="DS.CODE-AREA.FULLSCREEN"
        defaultMessage="Fullscreen"
      />
    ),
    closeFullscreen: (
      <FormattedMessage
        id="DS.CODE-AREA.CLOSE-FULLSCREEN"
        defaultMessage="Close fullscreen"
      />
    ),
    fullscreenTitle: (
      <FormattedMessage
        id="DS.CODE-AREA.FULLSCREEN-TITLE"
        defaultMessage="Fullscreen editor"
      />
    ),
  };
  return {
    ...defaultTexts,
    ...texts,
  };
};
