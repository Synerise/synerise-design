import { CollectorTexts } from '../../Collector.types';

export type ButtonPanelProps = {
  onCancel: () => void;
  onConfirm: () => void;
  disabled: boolean;
  showCancel: boolean;
  texts: CollectorTexts;
}