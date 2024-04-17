import * as React from 'react';

const MonacoEditor = React.forwardRef(({ onChange, value, 'data-testid': dataTestId }, ref) => {
  return (
    <input
      type="text"
      onChange={event => onChange(event.target.value)}
      value={value}
      aria-label={dataTestId}
      data-testid={dataTestId}
    />
  );
});
export default MonacoEditor;