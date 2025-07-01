import { type Texts } from '../../../DateRangePicker.types';

export type SaveFilterFormProps = {
  texts: Pick<Texts, 'saveFilter' | 'filterName'>;
  onFilterSave: (name: string) => void;
};
