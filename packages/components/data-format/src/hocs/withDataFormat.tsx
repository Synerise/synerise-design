import React, { ComponentType } from 'react';

import { useDataFormat, UseDataFormatProps } from '../hooks';

export type WithDataFormatProps = UseDataFormatProps;

export const withDataFormat = <Props extends object>(WrappedComponent: ComponentType<Props>): ComponentType<Props> => {
  return (props: Props): JSX.Element => {
    const { formatValue } = useDataFormat();
    return <WrappedComponent {...props} formatValue={formatValue} />;
  };
};
