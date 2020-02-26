import * as React from 'react';
import { TagShape } from '@synerise/ds-tags';
import * as S from './Status.styles';

export interface StatusProps {
  label: string;
  type: 'primary' | 'success' | 'warning' | 'danger' | 'disabled';
  className?: string;
  onClick?: () => void;
}

const Status: React.FC<StatusProps> = ({ type, onClick, className, label }) => {
  return (
    <S.StatusTag
      onClick={onClick}
      className={`ds-status ${className || ''}`}
      shape={TagShape.STATUS_NEUTRAL}
      type={type}
      name={label}
    />
  );
};

Status.defaultProps = {
  type: 'primary',
};

export default Status;
