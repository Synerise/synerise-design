import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { StepCardTexts } from '../StepCard.types';

export const useDefaultTexts = (texts?: Partial<StepCardTexts>): StepCardTexts => {
  const { formatMessage } = useIntl();
  const allTexts = useMemo(
    () => ({
      matching: formatMessage({ id: 'DS.MATCHING.PERFORMED', defaultMessage: 'Performed' }),
      notMatching: formatMessage({ id: 'DS.MATCHING.NOT-PERFORMED', defaultMessage: 'Not performed' }),
      conditionType: formatMessage({ id: 'DS.STEP-CARD.CONDITION-TYPE', defaultMessage: 'event' }),
      notConditionType: formatMessage({ id: 'DS.STEP-CARD.NOT-CONDITION-TYPE', defaultMessage: 'event' }),
      namePlaceholder: formatMessage({ id: 'DS.STEP-CARD.NAME-PLACEHOLDER', defaultMessage: 'Name' }),
      moveTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE', defaultMessage: 'Move' }),
      moveUpTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE-UP', defaultMessage: 'Move Up' }),
      moveDownTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE-DOWN', defaultMessage: 'Move Down' }),
      deleteTooltip: formatMessage({ id: 'DS.STEP-CARD.DELETE', defaultMessage: 'Delete' }),
      duplicateTooltip: formatMessage({ id: 'DS.STEP-CARD.DUPLICATE', defaultMessage: 'Duplicate' }),
      ...(texts || {}),
    }),
    [formatMessage, texts]
  );
  return allTexts;
};
