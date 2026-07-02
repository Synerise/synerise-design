import { useIntl } from 'react-intl';

import { type ImageTexts } from './Image.shared.types';

/**
 * Resolves the control labels: DS-translated defaults (`DS.IMAGE.*`) shallow-
 * merged with any consumer overrides. Returns plain strings so they work as
 * both tooltip `title` and `aria-label`. Requires an `IntlProvider` ancestor
 * (supplied by `@synerise/ds-core`'s `DSProvider`).
 */
export const useImageTexts = (texts?: Partial<ImageTexts>): ImageTexts => {
  const intl = useIntl();
  return {
    zoomIn: intl.formatMessage({
      id: 'DS.IMAGE.ZOOM-IN',
      defaultMessage: 'Zoom in',
    }),
    zoomOut: intl.formatMessage({
      id: 'DS.IMAGE.ZOOM-OUT',
      defaultMessage: 'Zoom out',
    }),
    nextImage: intl.formatMessage({
      id: 'DS.IMAGE.NEXT-IMAGE',
      defaultMessage: 'Next image',
    }),
    previousImage: intl.formatMessage({
      id: 'DS.IMAGE.PREVIOUS-IMAGE',
      defaultMessage: 'Previous image',
    }),
    download: intl.formatMessage({
      id: 'DS.IMAGE.DOWNLOAD',
      defaultMessage: 'Download',
    }),
    close: intl.formatMessage({
      id: 'DS.IMAGE.CLOSE',
      defaultMessage: 'Close',
    }),
    delete: intl.formatMessage({
      id: 'DS.IMAGE.DELETE',
      defaultMessage: 'Delete',
    }),
    ...(texts || {}),
  };
};
