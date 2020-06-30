import { WrappedComponentProps } from 'react-intl';

export interface Props extends WrappedComponentProps {
  value: string;
  onChange: (v: string) => {};
}
