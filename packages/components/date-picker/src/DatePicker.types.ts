
export type Props = {
  format?: string;
  showTime?: boolean;
  value?: Date | null;
  onApply?: () => void;
  disabledDate?: (day: Date) => void;
  disabledHours: () => void;
  disabledMinutes: () => void;
  disabledSeconds: () => void;
  useStartOfDay?: boolean;
  useEndOfDay?: boolean;
};

export type State = {
  mode: string;
  month: Date;
  changed: boolean;
  value?: Date;
  enteredTo?: Date;
};
