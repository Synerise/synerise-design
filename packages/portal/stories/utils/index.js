import * as React from 'react';

export const UseState = ({ render, initialValue }) => {
  const [variable, setVariable] = React.useState(initialValue);
  return render(variable, setVariable);
};
