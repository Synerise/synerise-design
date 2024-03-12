import { ReactNode } from 'react';
import { RadioProps } from 'antd/lib/radio';

export interface Props extends RadioProps {
  description?: ReactNode;
}
