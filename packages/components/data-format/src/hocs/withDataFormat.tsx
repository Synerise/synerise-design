import React from 'react';

import { useDataFormat } from '../hooks';
import { OverloadFormatValue } from '../types';

export type WithDataFormatProps = {
  formatValue: OverloadFormatValue;
};

export const withDataFormat = <Props extends object>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentType<Props> => {
  return (props: Props): JSX.Element => {
    const { formatValue } = useDataFormat();
    return <WrappedComponent {...props} formatValue={formatValue} />;
  };
};
