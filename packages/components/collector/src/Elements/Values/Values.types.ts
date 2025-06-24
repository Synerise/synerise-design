import { CollectorValue } from '../../Collector.types';

export type ValuesProps = {
  values: CollectorValue[];
  onDeselect?: (value: CollectorValue) => void;
  focused: boolean;
  disabled: boolean;
  hasError?: boolean;
  displayLookupKey: string;
};
