import { isSearchActionType } from './typeguards.utils';
import type { ActionType } from '../../ItemPickerNew/ItemPickerNew.types';

export const getGlobalOrLocalSearchActionType = (actions?: ActionType[], sectionId?: string) => {
  const foundAction = actions?.find(action => action.actionType === 'search' && action?.sectionId === sectionId);
  return isSearchActionType(foundAction) ? foundAction : undefined;
};
