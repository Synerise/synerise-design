import { RadioProps } from 'antd/lib/radio';

export interface Props extends RadioProps {
  description?: string;
  title?: string;
  tooltip?: boolean;
}
