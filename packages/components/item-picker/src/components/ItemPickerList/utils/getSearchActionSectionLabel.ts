import type { SearchActionType } from '../../ItemPickerNew/ItemPickerNew.types';

export const getSearchActionSectionLabel = (action?: SearchActionType) => action?.sectionTitle || action?.text;
