import React from 'react';

import { useDataFormat, UseDataFormatProps } from '../hooks';

export type WithDataFormatProps = UseDataFormatProps;

export const withDataFormat = <Props extends WithDataFormatProps = WithDataFormatProps>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentType<Props & WithDataFormatProps> => {
  const HocComponent: React.FC<Props> = (props: Omit<Props, keyof WithDataFormatProps>) => {
    const dataFormatProps = useDataFormat();
    return <WrappedComponent {...dataFormatProps} {...(props as Props)} />;
  };

  return HocComponent;
};
