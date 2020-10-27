import { CollectorValue } from '../../Collector.types';

export type ValuesProps = {
  values: CollectorValue[];
  onRemove: (removedValue: CollectorValue) => void;
  focused: boolean;
  disabled: boolean;
  showLookupKey: string;
};
