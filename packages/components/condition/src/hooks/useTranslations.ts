import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { type ConditionTexts } from '../Condition.types';

export const useTranslations = (
  defaultTexts?: Partial<ConditionTexts>,
): ConditionTexts => {
  const { formatMessage } = useIntl();

  const texts = useMemo(
    () => ({
      stepNamePrefix: formatMessage({
        id: 'DS.CONDITION.STEP_NAME-PREFIX',
        defaultMessage: 'Step',
      }),
      emptyConditionLabel: formatMessage({
        id: 'DS.CONDITION.EMPTY_CONDITION_LABEL',
        defaultMessage: 'Choose event first',
      }),
      stepNamePlaceholder: formatMessage({
        id: 'DS.CONDITION.STEP_NAME-PLACEHOLDER',
        defaultMessage: 'Step name',
      }),
      removeConditionRowTooltip: formatMessage({
        id: 'DS.CONDITION.REMOVE-CONDITION-ROW-TOOLTIP',
        defaultMessage: 'Delete',
      }),
      addConditionRowButton: formatMessage({
        id: 'DS.CONDITION.ADD-CONDITION-ROW-BUTTON',
        defaultMessage: 'Add condition',
      }),
      addFirstConditionRowButton: formatMessage({
        id: 'DS.CONDITION.ADD-FIRST-CONDITION-ROW-BUTTON',
        defaultMessage: 'Add condition',
      }),
      dropLabel: formatMessage({
        id: 'DS.CONDITION.DROP-LABEL',
        defaultMessage: 'Drop me here',
      }),
      moveTooltip: formatMessage({
        id: 'DS.CONDITION.MOVE-TOOLTIP',
        defaultMessage: 'Move',
      }),
      duplicateTooltip: formatMessage({
        id: 'DS.CONDITION.DUPLICATE-TOOLTIP',
        defaultMessage: 'Duplicate',
      }),
      removeTooltip: formatMessage({
        id: 'DS.CONDITION.REMOVE-TOOLTIP',
        defaultMessage: 'Delete',
      }),
      addStep: formatMessage({
        id: 'DS.CONDITION.ADD-STEP',
        defaultMessage: 'Add step',
      }),
      conditionSuffix: formatMessage({
        id: 'DS.CONDITION.SUFFIX',
        defaultMessage: 'and',
      }),
      ...(defaultTexts || {}),
    }),
    [formatMessage, defaultTexts],
  );

  return texts;
};
