import type { ActionType } from '../../ItemPickerNew/ItemPickerNew.types';
import { isSearchActionType } from './typeguards.utils';

export const getGlobalOrLocalSearchActionType = (
  actions?: ActionType[],
  sectionId?: string,
) => {
  const foundAction = actions?.find(
    (action) =>
      action.actionType === 'search' && action?.sectionId === sectionId,
  );
  return isSearchActionType(foundAction) ? foundAction : undefined;
};
