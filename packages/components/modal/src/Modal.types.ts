import { ModalProps } from 'antd/lib/modal';
import * as React from 'react';

export interface Props extends ModalProps {
  description?: string;
  headerActions?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'extraLarge' | 'fullSize';
  bodyBackground?: 'white' | 'grey';
  blank?: boolean;
  texts?: {
    okButton?: string;
    cancelButton?: string;
  };
}