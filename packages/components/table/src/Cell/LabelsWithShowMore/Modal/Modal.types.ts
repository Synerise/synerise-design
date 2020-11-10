import { ShowMoreTexts } from '../LabelsWithShowMore.types';

export type ModalProps<T extends object> = {
  visible: boolean;
  items: T[];
  hide: () => void;
  renderItem: (label: string, item: T) => Element;
  labelKey: string;
  texts: ShowMoreTexts;
};
