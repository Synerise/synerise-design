import React, { ComponentType } from 'react';

import { useDataFormat, UseDataFormatProps } from '../hooks';

export type WithDataFormatProps = UseDataFormatProps;

export const withDataFormat = <Props extends object>(
  WrappedComponent: ComponentType<Props>
): ComponentType<Omit<Props, keyof UseDataFormatProps>> => {
  return (props: Omit<Props, keyof UseDataFormatProps>): JSX.Element => {
    const dataFormatProps = useDataFormat();
    const newProps = { ...props, ...dataFormatProps } as Props;
    return <WrappedComponent {...newProps} />;
  };
};
