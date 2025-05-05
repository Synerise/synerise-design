import { CardTabProps, PrefixProps } from '../CardTab.types';

export type CardTabPrefixProps = PrefixProps & {
  draggable?: boolean;
  dragHandleProps?: CardTabProps['dragHandleProps'];
};
