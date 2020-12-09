import * as React from 'react';
import Day from './Day';
import { DayProps } from './Day.types';

const MemoizedDay: React.FC<DayProps> = ({
  dayKey,
  label,
  tooltip,
  restricted,
  intl,
  onToggle,
  readOnly,
  texts,
  active,
}) => {
  const memo = React.useMemo<JSX.Element>(
    () => (
      <Day
        key={dayKey}
        dayKey={dayKey}
        data-attr={dayKey}
        label={label}
        tooltip={tooltip}
        restricted={restricted}
        active={active}
        readOnly={readOnly}
        intl={intl}
        onToggle={onToggle}
        texts={texts}
      />
    ),
    [dayKey, label, tooltip, active, restricted, intl, onToggle, readOnly, texts]
  );
  return memo;
};

export default MemoizedDay;
