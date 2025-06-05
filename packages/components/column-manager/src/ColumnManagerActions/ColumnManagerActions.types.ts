import { ColumnManagerTexts } from '../ColumnManager.types';

export type ColumnManagerActionsProps = {
  onApply: () => void;
  onCancel: () => void;
  texts: ColumnManagerTexts;
};
