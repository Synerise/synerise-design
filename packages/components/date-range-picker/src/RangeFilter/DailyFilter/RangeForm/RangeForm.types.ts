export type RangeFormProps = {
  startDate: Date;
  endDate: Date;
  onStartChange: (value: Date) => void;
  onEndChange: (value: Date) => void;
};
