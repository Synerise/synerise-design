import * as React from 'react';
import Button from '@synerise/ds-button';
import { Title, Description } from '@synerise/ds-typography';
import { ActionAreaProps } from './ActionArea.types';
import * as S from './ActionArea.styles';

const ActionArea: React.FC<ActionAreaProps> = ({ label, description, action, actionLabel }) => {
  return (
    <S.ActionAreaWrapper className="ds-action-area">
      {label && <Title level={6}>{label}</Title>}
      <Description>{description}</Description>
      <Button type="primary" onClick={action}>
        {actionLabel}
      </Button>
    </S.ActionAreaWrapper>
  );
};
export default ActionArea;
