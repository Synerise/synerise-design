import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { EmojiPickerTexts } from '../EmojiPicker.types';

export const useEmojiTranslations = (texts?: Partial<EmojiPickerTexts>): EmojiPickerTexts => {
  const { formatMessage } = useIntl();
  const allTexts = useMemo(
    () => ({
      'smileys-emotion': <FormattedMessage id="DS.ICON-PICKER.SMILEYS" defaultMessage="Smileys" />,
      'people-body': <FormattedMessage id="DS.ICON-PICKER.SMILEYS" defaultMessage="People & body" />,
      'animals-nature': <FormattedMessage id="DS.ICON-PICKER.SMILEYS" defaultMessage="Animals & nature" />,
      'food-drink': <FormattedMessage id="DS.ICON-PICKER.SMILEYS" defaultMessage="Food & drink" />,
      'travel-places': <FormattedMessage id="DS.ICON-PICKER.SMILEYS" defaultMessage="Travel & places" />,
      activities: <FormattedMessage id="DS.ICON-PICKER.SMILEYS" defaultMessage="Activities" />,
      objects: <FormattedMessage id="DS.ICON-PICKER.SMILEYS" defaultMessage="Objects" />,
      symbols: <FormattedMessage id="DS.ICON-PICKER.SMILEYS" defaultMessage="Symbols" />,
      flags: <FormattedMessage id="DS.ICON-PICKER.SMILEYS" defaultMessage="Flags" />,
      placeholder: formatMessage({ id: 'DS.ICON-PICKER.PLACEHOLDER', defaultMessage: 'Search' }),
      empty: <FormattedMessage id="DS.ICON-PICKER.NO-MATCHES" defaultMessage="No emojis found" />,
      ...(texts || {}),
    }),
    [texts, formatMessage]
  );
  return allTexts;
};
